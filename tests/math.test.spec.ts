import { test, expect } from '@playwright/test'

const url = 'https://www.thatquiz.org/'

const mathOperations = ['+','-','*','/']

test('That Quiz', async ({ page }) => {
  await page.goto(url)
  await expect(page).toHaveTitle('ThatQuiz')
})

test('That Quiz - Arithmetic 100% right', async ({ page }) => {
  await page.goto(url)
  await page.getByText('Arithmetic').first().click()
  await expect(page.getByText('=')).toBeVisible()
  for (let i = 0; i < 10; i++) {
    const mathChallenge = (await page.locator('td.qq.nw.q8s').first().innerText()).split(' ')
    const rightAnswers = await page.inputValue('#q917')
    const wrongAnswers = await page.inputValue('#q91a')
    await expect(rightAnswers).toBe((i).toString())
    await expect(wrongAnswers).toBe('0')
    await expect(mathOperations).toContain(mathChallenge[1])
    let result = 0
    switch (mathChallenge[1]) {
      case '+':
        result = parseInt(mathChallenge[0]) + parseInt(mathChallenge[2])
        break;
        case '-':
          result = parseInt(mathChallenge[0]) - parseInt(mathChallenge[2])
          break;
          case '*':
            result = parseInt(mathChallenge[0]) * parseInt(mathChallenge[2])
            break;
            case '/':
              result = parseInt(mathChallenge[0]) / parseInt(mathChallenge[2])
              break;
              default:
                break;
              }
              await page.locator('input#C').fill(result.toString())
              await page.keyboard.press('Enter')
  }

  await expect(page.getByText('Score')).toBeVisible()
  await expect(page.getByText('100%')).toBeVisible()


})
