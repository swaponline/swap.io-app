Репозиторий swap.app-io


Создание/Восстановление профиля
```
import SwapKeysApi from '@/keys-api'

const frame = SwapKeysApi.restoreProfile({
    callback: message => {
      const { payload } = message
      switch (message.type) {
        case SwapKeysApi.restoreProfileAnswers.IFRAME_INITED:
          // Фрейм загружен
          break
        case SwapKeysApi.restoreProfileAnswers.RECOVER_CANCELED:
          // Отмена создания/восстановления
          break
        case SwapKeysApi.restoreProfileAnswers.PROFILE_RECOVERED:
          // Профиль создан/восстановлен. Информация о профиле
          console.log(payload.profile)
          break
      }
    }
  })
```


Создание кошелька/адресса
```
```