const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Bloglist', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Risto Testaaja',
        username: 'testiristo',
        password: 'salainen'
      }

    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Login in to application')).toBeVisible
    await expect(page.getByTestId('username')).toBeVisible
    await expect(page.getByTestId('password')).toBeVisible

  })

  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('testiristo')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', {name: 'login'}).click()

        await expect(page.getByText('Risto Testaaja logged in')).toBeVisible
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('nottestiristo')
        await page.getByTestId('password').fill('notsalainen')
        await page.getByRole('button', {name: 'login'}).click()

        const errorDiv = await page.locator('.error')

        await expect(errorDiv).toContainText('wrong username or password')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('Risto Testaaja logged in')).not.toBeVisible()
    })
  })
})  