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
const walletInfo = await SwapKeysApi.createWallet({
  profileId: '023e01483c',
  networkId: 'solana',
  coin: 'SOL',
  walletNumber: 0,
  options: {
    template: 'default',
    templateSettings: { ... }
  }
})

```


Ответ
```
{
  "status": "generated",
  "wallet": {
      "profileId": "023e01483c",
      "networkId": "solana",
      "coin": "SOL",
      "walletNumber": 0,
      "address": "3WfGVzwANjbaLh6fokA41qtwMikpFWXSJtHS7uvrJQGV",
      "publicKey": "3WfGVzwANjbaLh6fokA41qtwMikpFWXSJtHS7uvrJQGV"
  }
}
```

Подпись сообщения
```
const signedMessage = await SwapKeysApi.signMessage({
  profileId: '023e01483c',
  message: 'Some message for sign'
})
```

Ответ
```
```