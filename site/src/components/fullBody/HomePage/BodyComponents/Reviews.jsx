import { Carousel } from 'react-bootstrap';
import StarIcon from '@mui/icons-material/Star';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

function Reviews() {
    return <>
        <div style={{ background: 'rgba(17, 17, 18, 0.65)', width: '100%', paddingBottom: '30px', minHeight: '460px' }}>
                <div className="container">
                    <div className="tytleStaleComents" id="reviews">
                        <h2>Отзывы</h2>
                    </div>
                    <Carousel fade={true} slide={true} touch={'true'}>
                        <Carousel.Item interval={null} touch={'true'}>
                            <div className="containerCard">
                                <div className="card-header-coments">
                                    <SentimentSatisfiedAltIcon style={{ color: 'white', marginRight: '5px' }}></SentimentSatisfiedAltIcon>
                                    <span className="card-header-text-coments">GOR4666</span>
                                </div>
                                <div className="card-body-coments">
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                            <p>Warface</p>
                                            <div>6000.00₽</div>
                                        </div>
                                        <StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon>
                                    </div>
                                    Всё происходит очень быстро. Все продавцы очень вежливы и пытаются сделать всё как можно лучше. Всем советую)
                                </div>
                            </div>
                            <div className="containerCard">
                                <div className="card-header-coments">
                                    <SentimentSatisfiedAltIcon style={{ color: 'white', marginRight: '5px' }}></SentimentSatisfiedAltIcon>
                                    <span className="card-header-text-coments">lwhite</span>
                                </div>
                                <div className="card-body-coments">
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                            <p>CS: Global Offensive</p>
                                            <div>5100.00₽</div>
                                        </div>
                                        <StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon>
                                    </div>
                                    Очень хороший сервис продаж, всем рекомендую, сам продаю на ней больше года, поддержка топ, покупатели и продавцы
                                    лучшие!
                                </div>
                            </div>
                            <div className="containerCard">
                                <div className="card-header-coments">
                                    <SentimentSatisfiedAltIcon style={{ color: 'white', marginRight: '5px' }}></SentimentSatisfiedAltIcon>
                                    <span className="card-header-text-coments">SmartiOxigenium</span>
                                </div>
                                <div className="card-body-coments">
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                            <p>World Of Warcraft</p>
                                            <div>8000.00₽</div>
                                        </div>
                                        <StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon>
                                    </div>
                                    Минусов нету, всё очень удобно, быстрая и вежливая тех. поддержка. Всё честно и быстро. Рекомендую!
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item interval={null} touch={'true'}>
                            <div className="containerCard">
                                <div className="card-header-coments">
                                    <SentimentSatisfiedAltIcon style={{ color: 'white', marginRight: '5px' }}></SentimentSatisfiedAltIcon>
                                    <span className="card-header-text-coments">GOR4666</span>
                                </div>
                                <div className="card-body-coments">
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                            <p>Ражабик</p>
                                            <div>9300.00₽</div>
                                        </div>
                                        <StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon>
                                    </div>
                                    Отличный проверенный сайт для продажи игрового имущества и т. д, сам пользуюсь и вам советую, это вам не какой-то
                                    ноунейм сайт где вас кинут и пошлют подальше.
                                </div>
                            </div>
                            <div className="containerCard">
                                <div className="card-header-coments">
                                    <SentimentSatisfiedAltIcon style={{ color: 'white', marginRight: '5px' }}></SentimentSatisfiedAltIcon>
                                    <span className="card-header-text-coments">Artuazzz</span>
                                </div>
                                <div className="card-body-coments">
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                            <p>Lineage 2</p>
                                            <div>6400.00₽</div>
                                        </div>
                                        <StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon>
                                    </div>
                                    Пользуюсь услугами продолжительное время. Было дело что покупал/продавал аккаунты, было дело что покупал/продавал
                                    золото. Всё отлично и всём советую.
                                </div>
                            </div>
                            <div className="containerCard">
                                <div className="card-header-coments">
                                    <SentimentSatisfiedAltIcon style={{ color: 'white', marginRight: '5px' }}></SentimentSatisfiedAltIcon>
                                    <span className="card-header-text-coments">GOR4666</span>
                                </div>
                                <div className="card-body-coments">
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                            <p>Warface</p>
                                            <div>6000.00₽</div>
                                        </div>
                                        <StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon>
                                    </div>
                                    Всё происходит очень быстро. Все продавцы очень вежливы и пытаются сделать всё как можно лучше. Всем советую)
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item interval={null} touch={'true'}>
                            <div className="containerCard">
                                <div className="card-header-coments">
                                    <SentimentSatisfiedAltIcon style={{ color: 'white', marginRight: '5px' }}></SentimentSatisfiedAltIcon>
                                    <span className="card-header-text-coments">SkingerLoy</span>
                                </div>
                                <div className="card-body-coments">
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                            <p>Канал Telegram</p>
                                            <div>20000.00₽</div>
                                        </div>
                                        <StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon>
                                    </div>
                                    Со стороны покупателя площадка максимально доступна и понятна, а главное по возможности защищена, 100% Рекомендую
                                    ! Площадка свои роль в сделке выполняет.
                                </div>
                            </div>
                            <div className="containerCard">
                                <div className="card-header-coments">
                                    <SentimentSatisfiedAltIcon style={{ color: 'white', marginRight: '5px' }}></SentimentSatisfiedAltIcon>
                                    <span className="card-header-text-coments">Samvvediokda</span>
                                </div>
                                <div className="card-body-coments">
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                            <p>Aion</p>
                                            <div>12000.00₽</div>
                                        </div>
                                        <StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon>
                                    </div>
                                    Пользуюсь от случая к случаю, покупаю иногда всякую фигню в играх или аккаунты. Выбирал всегда аккуратно продавцов
                                    и ни разу не попал на кидал.
                                </div>
                            </div>
                            <div className="containerCard">
                                <div className="card-header-coments">
                                    <SentimentSatisfiedAltIcon style={{ color: 'white', marginRight: '5px' }}></SentimentSatisfiedAltIcon>
                                    <span className="card-header-text-coments">Jeka05Andy</span>
                                </div>
                                <div className="card-body-coments">
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                                            <p>Lost Ark</p>
                                            <div>20000.00₽</div>
                                        </div>
                                        <StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon><StarIcon style={{ color: 'gold' }}></StarIcon>
                                    </div>
                                    Поддержка работает очень быстро, все сотрудники понимают суть своей работы и помогают в любой ситуации. Много раз
                                    совершал покупки, все понравилось, удобный интерфейс, приятный дизайн. В общем, все на уровне.
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                    <div style={{ textAlign: 'center', color: 'antiquewhite', marginTop: '10px' }}>
                        <h6>
                            {' '}
                            Оставление отзыва после совершения сделки на нашем гарант сервисе это — ваш шанс высказаться и повлиять на улучшение
                            качества наших услуг.
                            <br /> Благодаря вашей добросовестности и времени, потраченному на оставление отзыва, вы способствуете росту нашего
                            сообщества и улучшению общего эффекта. <br />
                            Отзыв вы можете оставить после завершения сделки.
                        </h6>
                    </div>
                </div>
            </div>
    </>
}

export default Reviews