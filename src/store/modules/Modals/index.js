export const ADD_MODAL = 'ADD_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const MODULE_NAME = 'Modals'

export default {
  state: {
    modals: []
  },
  mutations: {
    /**
     * Добавляет модальное окно на страницу
     * @param {Object} modal - Объект модального окна
     * @param {String} modal.name - Имя модального окна
     * @param {Object} modal.info - payload
     */
    [ADD_MODAL](state, modal) {
      state.modals.push(modal)
    },
    /**
     * Закрывает модальное окно и удаляет его со страницы
     * @param {Number} id - ID модалки
     */
    [CLOSE_MODAL](state) {
      state.modals.pop()
    }
  }
}
