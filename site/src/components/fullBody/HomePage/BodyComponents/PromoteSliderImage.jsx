import img3 from '../../../../image/bg-reviews.jpg';
import img2 from '../../../../image/business-negotiate.jpg';
import img1 from '../../../../image/support.jpg';
import { Link } from 'react-router-dom';

function PromoteSliderImage(){
    return <>
     <div className="promote-slider promote-slider__showcase bg-img">
                <div className="container">
                    <div className="promote-slider_holder">
                        <ul className="promote-slider_list">
                            <li className="promote-slider_item">
                                <Link className="showcase" to="#">
                                    <img className="showcase_pic show-img-1" src={img1} alt="gg"></img>
                                    <span className="showcase_info">
                                        <span className="showcase_title">Помощь</span>
                                    </span>
                                </Link>
                            </li>
                            <li className="promote-slider_item">
                                <Link className="showcase" to="#">
                                    <span className="showcase_info">
                                        <span className="showcase_title">Разрешение споров</span>
                                    </span>
                                    <img className="showcase_pic show-img-1" src={img2} alt="qq"></img>
                                </Link>
                            </li>
                            <li className="promote-slider_item">
                                <Link className="showcase" to="#">
                                    <span className="showcase_info">
                                        <span className="showcase_title">Отзывы</span>
                                    </span>
                                    <img className="showcase_pic show-img-1" src={img3} alt="ss"></img>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </>
}

export default PromoteSliderImage