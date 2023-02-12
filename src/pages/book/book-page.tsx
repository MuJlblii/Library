import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../app/hook';
import { IBookType } from '../../app/reducer';
import image from '../../assets/img/default_book.png';
import logo from '../../assets/img/Ellipse 10.png';
import {ReactComponent as IconSpoiler} from '../../assets/img/Icon_spoiler_black.svg';
import {ReactComponent as SlashIcon} from '../../assets/img/Slash.svg';
import {ReactComponent as StarIcon} from '../../assets/img/Star.svg'; 
import { Gallery } from '../../components/gallery';

import style from './book-page.module.css';

export const BookPage = () => {
  const [isSpoiler, setIsSpoiler] = useState(false);
  const {category, bookId} = useParams();
  const stateData = useAppSelector((state) => state.main.data);
  const cardData: IBookType = stateData[category as string].find((el: IBookType )=> el.id === bookId);

  return (
    <section className={style.section}>
      <div className={`${style.crumbs}`}>
        <div className={`${style.crumbs_content} ${style.container}`}>
          <p>Бизнес книги</p>
          <span>
            <SlashIcon />
          </span>
          <p>Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих</p>
        </div>
      </div>
      <div className={`${style.container}`}>
        <div className={style.basic__content}>
          <div className={style.basic__content_img}>
            {cardData.image === '' && <img src={image} alt='Book' />}
            {(typeof cardData.image !== 'object' && cardData.image !== '') &&
              <img src={require('../../assets/img/book.png')} alt='Book' // eslint-disable-line global-require
              /> }
            {typeof cardData.image === 'object' && cardData.image.length && <Gallery images={cardData.image} id={bookId}/>}
          </div>
            <div className={style.basic__content_header}>
              <h3 className={style.basic__content_title}>
                Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
              </h3>
              <p className={style.basic__content_author}>Адитья Бхаргава, 2019</p>
              <input type='button' className={style.basic__content_bill} value='ЗАБРОНИРОВАТЬ' />
            </div>
            <div className={style.basic__content_footer}>
              <p className={style.basic__content_footer_title}>О книге</p>
              <hr className={style.basic__content_footer_hr} />
              <div className={style.basic__content_footer_cont}>
                <p className={style.basic__content_footer_paragraph}>
                    Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
                    решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
                    изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
                    время?
                </p>
                <p className={style.basic__content_footer_paragraph}>
                    Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
                    алгоритмы — это веселое и увлекательное занятие.
                </p>
              </div>
            </div>
        </div>
        <div className={style.additional_block}>
          <div className={style.rating}>
            <p className={style.rating_header}>Рейтинг</p>
            <hr className={style.hr} />
            <div className={style.grade}>
              <StarIcon fill='#FFBC1F' width={28} height={28}/>
              <StarIcon fill='#FFBC1F' width={28} height={28} />
              <StarIcon fill='#FFBC1F' width={28} height={28} />
              <StarIcon fill='#FFBC1F' width={28} height={28} />
              <StarIcon fill='#FFBC1F' width={28} height={28} />
              <p className={style.grade_num}>4.3</p>
            </div>
          </div>
          <div className={style.detailed}>
            <p className={style.detailed_title}>Подробная информация</p>
            <hr className={style.hr} />
            <div className={style.detailed__table}>
              <div className={style.detailed__table_first}>
                <p className={style.detailed_topic}>Издательство</p>
                <p className={style.detailed_description}>Питер</p>
                <p className={style.detailed_topic}>Год издания</p>
                <p className={style.detailed_description}>2019</p>
                <p className={style.detailed_topic}>Страниц</p>
                <p className={style.detailed_description}>288</p>
                <p className={style.detailed_topic}>Переплет</p>
                <p className={style.detailed_description}>Мягкая обложка</p>
                <p className={style.detailed_topic}>Формат</p>
                <p className={style.detailed_description}>70х100</p>
              </div>
              <div className={style.detailed__table_two}>
                <p className={style.detailed_topic}>Жанр</p>
                <p className={style.detailed_description}>Компьютерная литература</p>
                <p className={style.detailed_topic}>Вес</p>
                <p className={style.detailed_description}>370 г</p>
                <p className={style.detailed_topic}>ISBN</p>
                <p className={style.detailed_description}>978-5-4461-0923-4</p>
                <p className={style.detailed_topic}>Изготовитель</p>
                <p className={style.detailed_description}>
                  ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29
                </p>
              </div>
            </div>
          </div>
          <div className={style.feedback}>
            <div className={style.feedback__header}>
              <p className={style.feedback__title}>
                Отзывы<span className={style.feedback__title_total}>2</span>
              </p>
              <IconSpoiler
                onClick={() => setIsSpoiler(!isSpoiler)}
                className={isSpoiler ? style.feedback__spoiler_icon : style.feedback__spoiler_icon_active}
                data-test-id='button-hide-reviews'
              />
            </div>
            {isSpoiler && 
                <div className={style.feedback__detailed_wrapper}>
                  <div className={style.feedback__detailed}>
                    <div className={style.feedback__detailed_header}>
                      <img src={logo} alt='Logo' />
                      <div className={style.feedback__detailed_text_wrapper}>
                        <p className={style.feedback__detailed_text}>Иван Иванов</p>
                        <p className={style.feedback__detailed_text}>5 января 2019</p>
                      </div>
                    </div>
                    <div className={style.grade}>
                      <StarIcon fill='#FFBC1F' /> <StarIcon fill='#FFBC1F' /> <StarIcon fill='#FFBC1F' /> <StarIcon fill='#FFBC1F' /> <StarIcon />
                    </div>
                  </div>
                  <div className={style.feedback__detailed}>
                    <div className={style.feedback__detailed_header}>
                      <img src={logo} alt='Logo' />
                      <div className={style.feedback__detailed_text_wrapper}>
                        <p className={style.feedback__detailed_text}>Николай Качков</p>
                        <p className={style.feedback__detailed_text}>20 июня 2018</p>
                      </div>
                    </div>
                    <div className={style.grade}>
                      <StarIcon fill='#FFBC1F' /> <StarIcon fill='#FFBC1F' /> <StarIcon fill='#FFBC1F' /> <StarIcon fill='#FFBC1F' /> <StarIcon />
                    </div>
                    <p className={style.feedback__detailed_text}>
                      Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не
                      оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение
                      современных методик предоставляет широкие возможности для позиций, занимаемых участниками в отношении
                      поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут
                      в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий
                      уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что
                      акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в посмешище, хотя
                      само их существование приносит несомненную пользу обществу.
                    </p>
                  </div>
                  <div className={style.feedback__detailed}>
                    <div className={style.feedback__detailed_header}>
                      <img src={logo} alt='Logo' />
                      <div className={style.feedback__detailed_text_wrapper}>
                        <p className={style.feedback__detailed_text}>Екатерина Беляева</p>
                        <p className={style.feedback__detailed_text}>18 февраля 2018</p>
                      </div>
                    </div>
                    <div className={style.grade}>
                      <StarIcon fill='#FFBC1F' /> <StarIcon fill='#FFBC1F' /> <StarIcon fill='#FFBC1F' /> <StarIcon fill='#FFBC1F' /> <StarIcon />
                    </div>
                  </div>
                </div>
            }
            <input type='button' value='оценить книгу' className={style.feedback_btn} />
          </div>
        </div>
      </div>
    </section>
  )
};
