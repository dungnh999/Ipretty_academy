
import React from "react";
import { useHistory } from "react-router-dom";
import { Link} from '@material-ui/core'
import LinkSvg from '../../../../public/icon_svg/externallink.svg'

function LinkImg(props) {
    const {link} = props
    let history = useHistory()
    return(
                    <Link
                        component="button"
                        onClick={() => {
                            history.push(link);
                        }}
                    >
                        <img
                            alt="link logo"
                            src={LinkSvg}
                            width={24}
                            height={24}
                        />
                    </Link>
    )
}
export default LinkImg