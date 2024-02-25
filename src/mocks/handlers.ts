import { http, HttpResponse } from "msw"
import { faker } from "@faker-js/faker"

const generateDate = () => {
  const lastWeek = new Date(Date.now())
  lastWeek.setDate(lastWeek.getDate() - 7)
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  })
}

const getRandomElement = (array: unknown[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const handlers = [
  http.post("/api/login", () => {
    return HttpResponse.json(
      {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
        },
      },
    )
  }),
  http.post("/api/logout", () => {
    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    })
  }),
  // challengeList
  http.get("/api/challenges", () => {
    const totalElements = faker.number.int({ min: 0, max: 500 })
    const past = [...Array(faker.number.int({ min: 0, max: 5 }))].map(() => faker.lorem.words())
    return HttpResponse.json({
      past: past,
      content: [...Array(faker.number.int({ min: 0, max: Math.min(10, totalElements) }))].map(() => ({
        id: faker.number.int(),
        title: faker.lorem.lines(),
        type: faker.lorem.word(),
        past: getRandomElement(past),
        state: getRandomElement(["unsolved", "solving", "solved"]),
        level: `Lv.${Math.floor(Math.random() * 6)}`,
        correctRate: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
        completedUserCount: faker.number.float(),
      })),
      pageable: {
        pageNumber: 0,
        pageSize: 10,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: true,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / 10),
      size: 10,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      first: true,
      numberOfElements: totalElements % 10,
      empty: totalElements === 0,
    })
  }),
]
