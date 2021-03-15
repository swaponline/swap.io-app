export const ADD_MODAL = 'ADD_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CLOSE_ALL_MODAL = 'CLOSE_ALL_MODAL'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

export const MODULE_NAME = 'Modals'

export default {
  state: {
    modals: []
  },
  mutations: {
    /**
     * Добавляет модальное окно на страницу
     * @param {Object} modal - Объект модального окна
     * @param {String} modal.id - id для обычного скрытия модального окна
     * @param {String} modal.name - Имя модального окна
     * @param {Object} modal.info - payload
     */
    [ADD_MODAL](state, modal) {
      const stateModal = state.modals.find(m => {
        if (modal.id) {
          return m.id === modal.id
        }
        return m.name === modal.name
      })
      if (stateModal) {
        stateModal.show = true
      } else {
        state.modals.push(modal)
      }
    },
    /**
     * Включение-выключение модального окна, для сохранения параметров формы
     * в случае закрытия по клику вне нее
     * @param {String} id - id
     * @param {Boolean} show - Значение show
     */
    [TOGGLE_MODAL](state, { id, show }) {
      const stateModal = state.modals.find(m => m.id === id)
      if (stateModal) {
        stateModal.show = show
      }
    },
    /**
     * Закрывает модальное окно и удаляет его со страницы
     */
    [CLOSE_MODAL](state, id) {
      const modalIndex = state.modals.findIndex(m => id !== undefined && m.id === id)
      if (modalIndex > -1) {
        state.modals.splice(modalIndex, 1)
      } else {
        state.modals.pop()
      }
    },
    /**
     * Закрывает все модальные окна
     */
    [CLOSE_ALL_MODAL](state) {
      state.modals = []
    }
  }
}
