import { GUEST_INVOICE_ROUTE_NAME } from '@/constants/routes'
import { INCOMING_INVOICE } from '@/store/modules/Modals/names'
import { ADD_MODAL } from '@/store/modules/Modals'

export default function openInvoice({ to, next, store }) {
  if (store.getters.hasProfile) {
    store.commit(ADD_MODAL, { name: INCOMING_INVOICE, show: true })
    return next()
  }
  return next({ name: GUEST_INVOICE_ROUTE_NAME, query: to.query })
}
