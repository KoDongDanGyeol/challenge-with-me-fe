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

const getChallengeTestcase = () => {
  return [...Array(faker.number.int({ min: 2, max: 5 }))].map(() => ({
    input: [JSON.stringify(faker.lorem.words().split(" ")), JSON.stringify(faker.lorem.words().split(" "))],
    expected: faker.number.int(),
  }))
}

const getChallengeDescription = (testcase: { input: string[]; expected: number }[]) => {
  return `
##### 문제 설명\n
${faker.lorem.lines({ min: 2, max: 10 })}
##### 제한사항\n
${[...Array(faker.number.int({ min: 2, max: 5 }))].map(() => `- ${faker.lorem.words()}`).join("\n")}\n
##### 입출력 예\n
| name | return |\n| ------ | ------ |\n${testcase.map(({ input, expected }) => `| ${input} | ${expected} |`).join("\n")}`
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
      totalPages: Math.ceil(totalElements / 10),
      totalElements: totalElements,
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
  // challengeDetail
  http.get("/api/challenges/:problemId", ({ params }) => {
    const { problemId } = params
    const testcase = getChallengeTestcase()
    return HttpResponse.json({
      id: problemId,
      title: faker.lorem.lines(),
      type: faker.lorem.word(),
      past: faker.lorem.words(),
      description: getChallengeDescription(testcase),
      testcases: [
        {
          testcaseTypes: {
            inputTypes: ["int[]", "int[]"],
            outputType: "int",
          },
          testcaseValues: testcase,
          hiddenTestcaseCount: faker.number.int({ min: 5, max: 10 }),
        },
      ],
      questionsCount: faker.number.int({ min: 0, max: 15 }),
      // isSuccessSoluction: true,
    })
  }),
  // challengeTestcase
  http.get("/api/challenges/:problemId/testcase", ({ params }) => {
    const testcase = getChallengeTestcase()
    return HttpResponse.json({
      testcaseTypes: {
        input: ["int[]", "int[]"],
        expected: "int",
      },
      testcaseValues: testcase,
    })
  }),
  // challengeRun
  http.post("/api/challenges/:problemId/run", ({ params }) => {
    return HttpResponse.json({
      submitType: "run",
      runResult: [
        {
          input: ["12"],
          expected: "28",
          output: "실행한 결괏값 50이 기댓값 28과 다릅니다.",
          performance: 1,
          errorMsg: null,
        },
        {
          input: ["12"],
          expected: "28",
          output: "테스트를 통과하였습니다.",
          performance: 0,
          errorMsg: null,
          passed: true,
        },
      ],
    })
  }),
  // challengeSubmit
  http.post("/api/challenges/:problemId/submit", ({ params }) => {
    return HttpResponse.json({
      submitType: "submit",
      runResult: [
        {
          input: ["12"],
          expected: "28",
          output: "실행한 결괏값 16이 기댓값 28과 다릅니다.",
          performance: 0,
          errorMsg: null,
          passed: false,
        },
        {
          input: ["0"],
          expected: "0",
          output: "테스트를 통과하였습니다.",
          performance: 0,
          errorMsg: null,
          passed: true,
        },
      ],
      submitResult: [
        {
          errorMsg: null,
          accuracyTest: "실패 (수행시간 : 0)",
          passed: false,
        },
        {
          errorMsg: null,
          accuracyTest: "통과 (수행시간 : 0)",
          passed: true,
        },
      ],
    })
  }),
  // challengeSolutionList
  http.get("/api/solutions/:problemId/group", ({ params }) => {
    const { problemId } = params
    const totalElements = faker.number.int({ min: 0, max: 500 })
    return HttpResponse.json({
      content: [...Array(faker.number.int({ min: 0, max: Math.min(5, totalElements) }))].map(() => ({
        id: faker.number.int(),
        problemId: problemId,
        memberId: faker.number.int({ min: 1, max: 5 }),
        submitCode: `import java.util.Scanner;\n  public class Solution {\n    public static void main(String[] args) {\n      Scanner sc = new Scanner(System.in);\n      String a = sc.next();\n    }\n  }`,
        language: "java",
        status: "성공",
        createdAt: faker.date.anytime,
        modifiedAt: faker.date.anytime,
        name: faker.internet.userName(),
        imgUrl: "https://source.unsplash.com/random/300x300/?person",
        correct: true,
      })),
      pageable: {
        pageNumber: 0,
        pageSize: 5,
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: true,
      totalPages: Math.ceil(totalElements / 10),
      totalElements: totalElements,
      size: 5,
      number: 0,
      sort: {
        empty: false,
        unsorted: false,
        sorted: true,
      },
      first: true,
      numberOfElements: totalElements % 10,
      empty: totalElements === 0,
    })
  }),
]
