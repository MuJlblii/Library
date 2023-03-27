export const ToasterMsg = {
    booking: {
        error: {type: 'error', message: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!'},
        errorChange: {type: 'error', message: 'Изменения не были сохранены. Попробуйте позже!'},
        errorDelete: {type: 'error', message: 'Не удалось снять бронирование книги. Попробуйте позже!'},
        success: {type: 'success', message: 'Книга забронирована. Подробности можно посмотреть на странице Профиль'},
        successChange: {type: 'success', message: 'Изменения успешно сохранены!'},
        successDelete: {type: 'success', message: 'Бронирование книги успешно отменено!'}
    },
    comment: {
        error: {type: 'error', message: 'Оценка не была отправлена. Попробуйте позже!'},
        success: {type: 'success', message: 'Спасибо, что нашли время оценить книгу!'},
        errorUpdate: {type: 'error', message: 'Изменения не были сохранены. Попробуйте позже!'},
        successUpdate: {type: 'success', message: 'Спасибо, что нашли время изменить оценку!'},
    },
    books: {
        error: {type:'error', message: 'Что-то пошло не так. Обновите страницу через некоторое время.'}
    },
    credentials: {
        successChange: {type: 'success', message: 'Изменения успешно сохранены!'},
        errorUpdate: {type: 'error', message: 'Изменения не были сохранены. Попробуйте позже!'},
    },
    headprofile: {
        success: {type: 'success', message: 'Фото успешно сохранено!'},
        error: {type: 'error', message: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!'},
    }
}