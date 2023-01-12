import { Link } from 'react-router-dom'
import '../../style/body.css'
import img3 from '../../image/bg-reviews.jpg'
import img2 from '../../image/business-negotiate.jpg'
import img1 from '../../image/support.jpg'

function Body() {
    return <div className="container-body-v1">
            <div className='promo-description'>
            <div className='block-main-v1'>
                <h1>gamesgun.ru - лучший гарант безопасных сделок!</h1>
                <button className='btn-class-v1'>Открыть новую сделку</button>
            </div>
            <div className='promo-block-text'>
                <p className='promo-block-text-center'>
                gamesgun.ru — автоматический сервис безопасных сделок, разработанный командой pwLVL при технической поддержке L2on.
                За годы работы мы накопили большой багаж знаний и опыта. gamesgun.ru является универсальным гарантом сделок в онлайн-играх, фрилансе, а также в любых других дистанционных продажах товаров и услуг, и надежно обеспечивает безопасность как покупателям, так и продавцам.
                </p>
            </div>
            <ul className='ist-promo'>
                <li className='list-promo-item'> 
                    <img></img>
                    <p>
                        Сервис несет ответственность
                        <br/>
                        за проведение сделок
                    </p>
                </li>
                <li className='list-promo-item'>
                    <img></img>
                    <p>
                        Сервис работает 24 часа в сутки
                        <br/>
                        7 дней в неделю
                    </p>
                </li>
                <li className='list-promo-item'>
                    <img></img>
                    <p>Комиссия меньше 10%</p>
                </li>
            </ul>
        </div>
        <div className='promo-steps'>
            <h3 class="header-inner_title">Как это работает</h3>
            <ul className='list-steps'>
                <li className='step'>
                    <h4 class="header-inner_title">Регистрация</h4>
                    <p>Услуги нашего сервиса безопасных сделок предоставляются только после того, как оба участника 
                        <a href="/register">регистрируются</a>на сайте.
                    </p>
                </li>
                <li className='step'>
                    <h4 class="header-inner_title">Обсуждение условий сделки</h4>
                    <p>
                    Участники обсуждают характеристики товара и сумму оплаты,
                            выбирают платежную систему (Яндекс.Деньги, QIWI, WebMoney или Банковская
                            карта), принимают решение о сумме залога либо его отсутствии.
                    </p>
                </li>
                <li className='step'>
                <h4 class="header-inner_title">Открытие сделки</h4>
                    <p>
                    Один из участников открывает сделку, другой её принимает. Если установлена опция залога, то оба участника
                    вносят залог. Если на данном этапе что-то идёт не так (второй участник пропал или не внёс залог), то сделка
                    отменяется, залоги возвращаются. Для общения и передачи информации используется внутренний чат.
                    </p>
                </li>
                <li className='step'>
                <h4 class="header-inner_title">Исполнение обязательств</h4>
                    <p>
                    Покупатель вносит деньги на баланс сделки, залоги сразу же
                    блокируются. Продавец видит это и передаёт товар, после чего покупатель
                    переводит деньги с баланса на баланс продавца. Продавец может отказаться
                    от сделки и вернуть деньги покупателю. Суть в том, что участники могут
                    переводит деньги с баланса только на баланс друг друга, но не на свои. В
                    случае спора участники могут обратиться к гаранту сделок (<a href="/disputes">арбитраж</a>)
                    </p>
                </li>
                <li className='step'>
                <h4 class="header-inner_title">Закрытие сделки</h4>
                    <p>
                    Если на балансе сделки нет денег, то один из участников её закрывает, залоги возвращаются. Сделка через
                            гаранта завершена.
                    </p>
                </li>
            </ul>
        </div>
        <div className='promote-slider promote-slider__showcase'>
            <div className='container'>
                <div className='promote-slider_holder'>
                    <ul className='promote-slider_list'>
                        <li className='promote-slider_item promote-slider_item_list'>
                            <div className='info-card '>
                                <div className='card-header'>
                                    <span className='card-header-text'>
                                        Надежность
                                    </span>
                                </div>
                                <div className='card-body'>
                                    Персональный аттестат Webmoney, идентифицированы Qiwi, Яндекс Деньги
                                    <br/>
                                    <br/>
                                    Больше года на рынке безопасных сделок
                                    <br/>
                                    <br/>
                                    Система вычисления вероятности того, что пользователь мошшенник
                                    <br/>
                                    <br/>
                                    Актуальный черный список с автоматической проверкой всех пользователей
                                </div>
                            </div>
                            <div className='info-card '>
                            <div className='card-header'>
                                    <span className='card-header-text'>
                                        Конфиденциальность
                                    </span>
                                </div>
                                <div className='card-body'>
                                    Сделка проходит на специальной странице, в закрытом чате, доступ к которому имеют только 2 участника и модератор сервиса.
                                    <br/>
                                    <br/>
                                    Запрет публикации данных для идентификации учетных записей.
                                <br/>
                                </div>
                            </div>
                            <div className='info-card '>
                            <div className='card-header'>
                                    <span className='card-header-text'>
                                        Удобство
                                    </span>
                                </div>
                                <div className='card-body'>
                                    Наглядное представление сервиса
                                    <br/>
                                    <br/>
                                    Удобство использования безопасной сделки.

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='block-text-free'>
                <p className='text-free'>
                <b>Самый надежный гарант игровых сделок.</b>
                    Мы только начали свою работу, и с каждым разом
                    будем улучшать наш сервис.            
                </p>
                <p className='text-free'>
                <b>Отзывчивая онлайн-поддержка.</b>
                    Безопасные сделки идут через специальный чат, к которому
                    имеют доступ обе стороны, а также консультанты gamesgun.ru, которых можно привлечь при необходимости.            
                </p>
                <p className='text-free'>
                <b>Оплата за посредничество минимальна.</b>
                    Еще одно преимущество — низкая комиссия, которую
                    взимает гарант безопасных сделок gamesgun.ru. Это небольшая сумма, но даже она дает вам уверенность, что вас не
                    обманут.            
                </p>
                <p className='text-free'>
                <b>Нет материальных рисков.</b>
                    Арбитраж сервиса несет материальную ответственность в случае
                    ошибки в разрешении спора между участниками, поэтому безопасная сделка в интернете с нами комфортнее, чем с
                    кем-либо. Защита интересов предоставляется обеим сторонам: продавцу и покупателю, фрилансеру и заказчику. Гарант
                    онлайн-сделок gamesgun.ru — ваш щит от нечестных продавцов и покупателей, нерадивых исполнителей, необязательных
                    заказчиков и прочих мошенников.             
                </p>
                <p className='text-free'>
                    Не проверяйте на честность продавца самостоятельно никогда, так как риск потерять ваши деньги
                    очень и очень велик! Пользуйтесь гарант сервисом gamesgun.ru. И помните, мошенник никогда, не при каких условиях не
                    согласится на безопасную сделку, на гаранта.            
                </p>
            </div>
        </div>
        <div className='promote-slider promote-slider__showcase'>
            <div className='container'>
                <div className='promote-slider_holder'>
                    <ul className="promote-slider_list">
                        <li className='promote-slider_item'>
                            <Link className='showcase' to='#'>
                                <img className='showcase_pic show-img-1' src={img1} alt='gg'></img>
                                <span className='showcase_info'>
                                    <span className='showcase_title'>Помощь</span>
                                </span>
                            </Link>
                        </li>
                        <li className='promote-slider_item'>
                            <Link className='showcase' to='#'>
                                <span className='showcase_info'>
                                    <span className='showcase_title'>Разрешение споров</span>
                                </span>
                                <img className='showcase_pic show-img-1' src={img2}></img>
                            </Link>
                        </li>
                        <li className='promote-slider_item'>
                            <Link className='showcase' to='#'>
                                <span className='showcase_info'>
                                <span className='showcase_title'>Отзывы</span>
                                </span>
                                <img className='showcase_pic show-img-1' src={img3}></img>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='block-text-free'>
                <p class="text-free"><b>gamesgun.ru</b> - предлагает безопасные сделки в интернете с сайтами, доменами, социальными сетями, аккаунтами онлайн-игр,
                    информационными услугами и многим другим. Вконтакте - крупнейшая социальная сеть на просторах СНГ,
                    если вам интересен доход, купить группу вк вконтакте.
                </p>
                <p class="text-free">Аналогов по охвату и функционалу на данный
                    момент не имеется, но цены достаточно высокие.
                    Всегда можно купить аккаунт facebook и развивать его дальше. Так
                    же сюда можно отнести видео-сеть youtube, которая идет в паре с
                    предыдущей.
                </p>
                <p class="text-free">Вторая по популярности сеть в русскоязычном сегменте - Oдноклассники.
                    Здесь вы найдете другую аудиторию и атмсоферу, поэтому можете купить группу однокласники.
                    Instagram - международная социальная сеть фото-формата, которая составляет конкуренцию даже facebook.
                </p>
                <p class="text-free">Для развития бизнеса можно купить аккаунт
                    инстаграм. Конечно же, номер один мирового интернета - facebook.
                    Аналогов по охвату и функционалу на данный момент не имеется, но
                    цены достаточно высокие.
                    Всегда можно купить аккаунт facebook и развивать его дальше. Так
                    же сюда можно отнести видео-сеть youtube, которая идет в паре с
                    предыдущей.
                    Если есть желание, то купить канал youtube и развивай, монетизируй
                    его в свое удовольствие. 
                </p>
                <p class="text-free">Относительно новый игрок на рынке социальных
                    сетей - telegram. Он сильно отлчиается от
                    Вконтакте,Facebook,Instagram,так как является мессенджером.
                </p>
            </div>
        </div>
    </div>
}

export default Body