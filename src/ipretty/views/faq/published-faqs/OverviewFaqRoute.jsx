
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import DetailFaqQuestion from './DetailFaqQuestion';
import OverviewFaq from './OverviewFaq'
import FaqService from 'ipretty/services/FaqService';
import { useFaq } from "ipretty/context/faq/FaqContext"
import { initialPrams } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import FAQQuestion from '../views/FAQQuestion';


const OverviewFaqRoute = (props) => {

    const { updateListFaqs, dataFaqs } = useFaq();
    const { pagination, keyword } = dataFaqs
    const params = initialPrams(queryString.parse(props.location.search, { arrayFormat: 'comma' }));

    useEffect(() => {
        getListFaqs()
    }, [keyword]);

    useEffect(() => {
        if (pagination.current_page && pagination.current_page != 1 || (pagination.current_page == 1 && pagination.next_page_url)) {
            getListFaqs()
        }
    }, [pagination.current_page]);

    function getListFaqs() {
        let _params = { ...params, isPublished: 1, paging: 1, page: pagination.current_page ? pagination.current_page : 1, keyword: keyword };
        FaqService.getListQuestion(_params,
            (responses) => {
                const  _pagination = pagination;
                let faqs = []
                if (responses.data.data && responses.data.data.data) {
                    faqs = responses.data.data.data;
                    _pagination.total = responses.data.data.total
                    _pagination.current_page = responses.data.data.current_page
                    _pagination.prev_page_url = responses.data.data.prev_page_url ? true : false
                    _pagination.next_page_url = responses.data.data.next_page_url ? true : false
                    
                    if (faqs.length > 0) {
                        faqs.map(faq => {
                            faq.isCollapse = false;
                            return faq;
                        })
                    }
                }

                const dataFaq = {
                    faqs: faqs,
                    pagination: _pagination,
                }
                updateListFaqs({ dataFaq });

            },
            (errors) => {

            }
        )
    }

    return (
        <div>
            <Switch>
                <Route exact path="/published-faqs" component={OverviewFaq} />
                <Route exact path="/published-faqs/:faq_id" component={OverviewFaq} />
                <Route exact path="/published-faqs/:faq_id/faq_question/:question_id/:isRedirect" component={DetailFaqQuestion} />
            </Switch>
        </div>
    )
}
export default OverviewFaqRoute