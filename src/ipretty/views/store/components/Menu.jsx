import React from "react";
import { useTranslation } from 'react-i18next';

const MenuStore = (props) => {
    const { t } = useTranslation()
    return (
        <div className="menu-new hidden-xs flex-sub">
            <ul className="menu">
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.COURSE_SKIN')}
                    </a>
                </li>
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.COSMECEUTICALS')}
                    </a>
                </li>
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.ACNE_TREATMENT')}
                    </a>
                </li>
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.CLEAR_SCAR_TREATMENT')}</a>
                </li>
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.MELASMA_TREATMENT')}
                    </a>
                </li>
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.LIFTING_TECHNOLOGY')}
                    </a>
                </li>
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.SKIN_PEEL_COURSE')}
                    </a>
                </li>
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.MESOTHERAPY_COURSE')}
                    </a>
                </li>
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.CONFERENCE_DAY')}
                    </a>
                </li>
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.TECHNOLOGY_DELIVERY')}
                    </a>
                </li>
                <li>
                    <a href="/course/ngoai-ngu"><i className="fa fa-language"></i>
                        {t('MENU.SPA_INDUSTRY.TITLE_SPA')}
                    </a>
                    <div className="megadrop">
                        <div className="col">
                            <ul>
                                <li>
                                    <a href="/course/ngoai-ngu">
                                        {t('MENU.SPA_INDUSTRY.SPA_INDUSTRY_MACHINERY')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/tag/tieng-han">
                                        {t('MENU.SPA_INDUSTRY.SPA_INDUSTRY_TECHNICAL')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/tag/tieng-han">
                                        {t('MENU.SPA_INDUSTRY.BASIC_SPA_COURSE')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/tag/tieng-han">
                                        {t('MENU.SPA_INDUSTRY.ADVANCED_SPA_COURSE')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default MenuStore;



