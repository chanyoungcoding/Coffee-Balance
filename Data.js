import { atom } from "recoil";

export const dataCoffee = atom({
  key: 'coffeeDataKey',
  default: {
    coffeeCount: 0,
    caffeine: 0,
    calory: 0,
  }
})

export const AllCoffeeData = atom({
  key: 'AllCoffeeDataKey',
  default: []
})

export const YesterDayCoffeeCaffeine = atom({
  key: 'YesterdayCaffeineKey',
  default: {
    caffeine: 0
  }
})
