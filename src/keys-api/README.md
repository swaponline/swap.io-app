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
signedMessage: {
  address: "0xbd751791407137625c9c7ff5ae3b084d50aa8195",
  message: "test message",
  network: "ethereum",
  pubkey: "0xf1ca3910e76c1c5704952ceb08b6d202efc0cb6a96363cf4b1b4a6750954005ac36994d162b86d89bdb46e5796a448f18d6a0d9485206ce1d247e762a70f4b10",
  sign: "0xa079d316fc1da0d17fd243b8e9e062703c116eab396ac4131cf002725682481f65f2e0dd48fb8c9568a9b9aca66e632ca916bfb571954e2ca6c8ee00ea356b881b"
}
```


Проверка подписи сообщения
```
await keysApi.validateMessage({signedMessage: {
  address: "0xbd751791407137625c9c7ff5ae3b084d50aa8195",
  message: "test message",
  network: "ethereum",
  pubkey: "0xf1ca3910e76c1c5704952ceb08b6d202efc0cb6a96363cf4b1b4a6750954005ac36994d162b86d89bdb46e5796a448f18d6a0d9485206ce1d247e762a70f4b10",
  sign: "0xa079d316fc1da0d17fd243b8e9e062703c116eab396ac4131cf002725682481f65f2e0dd48fb8c9568a9b9aca66e632ca916bfb571954e2ca6c8ee00ea356b881b"
}})
```