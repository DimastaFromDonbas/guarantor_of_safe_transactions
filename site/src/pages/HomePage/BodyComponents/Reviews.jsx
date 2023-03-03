import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { CarouselMock } from '../../../components/mock/ReviewsMock';
import CarouselItem from './reviewsComponent/CarouselItem';

function Reviews() {
    return <>
        <motion.div 
        initial = {{
            y: -20,
            opacity: 0
         }}
         whileInView = {{
            y: 0,
            opacity: 1,
            transition: { duration: .5 },
         }}
         exit = {{
            y: -20,
            opacity: 0
         }}
        viewport = {{amount: .2, once: true}}
        style={{ background: 'rgba(17, 17, 18, 0.65)', width: '100%', paddingBottom: '30px', minHeight: '460px' }}>
                <div className="container">
                    <div className="tytleStaleComents" id="reviews">
                        <h2>Отзывы</h2>
                    </div>
                    <Carousel fade={true} slide={true} touch={'true'}>
                        <Carousel.Item interval={null} touch={'true'}>
                            {CarouselMock.slice(0, 3).map((item, index) => <CarouselItem key={index} {...item}/>)}
                        </Carousel.Item>
                        <Carousel.Item interval={null} touch={'true'}>
                            {CarouselMock.slice(3, 6).map((item, index) => <CarouselItem key={index} {...item}/>)}
                        </Carousel.Item>
                        <Carousel.Item interval={null} touch={'true'}>
                            {CarouselMock.slice(6, 9).map((item, index) => <CarouselItem key={index} {...item}/>)}
                        </Carousel.Item>
                    </Carousel>
                    <div style={{ textAlign: 'center', color: 'antiquewhite', marginTop: '10px' }}>
                        <h6>
                            Оставление отзыва после совершения сделки на нашем гарант сервисе это — ваш шанс высказаться и повлиять на улучшение
                            качества наших услуг.
                            <br /> Благодаря вашей добросовестности и времени, потраченному на оставление отзыва, вы способствуете росту нашего
                            сообщества и улучшению общего эффекта. <br />
                            Отзыв вы можете оставить после завершения сделки.
                        </h6>
                    </div>
                </div>
            </motion.div>
    </>
}

export default Reviews