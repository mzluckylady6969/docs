/**
 * These tests assume you have starte the local dev server as a contributor
 * would. It does *not* use fixture data. It uses real English content
 * as seen in `main` or in the current branch. Therefore be careful
 * with what you can expect to find. Stick to known and stable content.
 *
 * It's always a risk that the content changes and can break tests
 * that exist to test the *code*. But these tests are ultimately there to
 * do what a human would do which is: Start the server, then open the
 * browser, then click around, then search, etc.
 *
 */

import { test, expect } from '@playwright/test'

test('view home page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/GitHub Docs/)
})

test('click "Get started" from home page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Get started' }).click()
  await expect(page).toHaveTitle(/Get started with GitHub/)
  await expect(page).toHaveURL(/\/en\/get-started/)
})

test('search "git" and get results', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('site-search-input').click()
  await page.getByTestId('site-search-input').fill('git')
  await page.getByTestId('site-search-input').press('Enter')
  await expect(page.getByRole('heading', { name: /\d+ Search results for "git"/ })).toBeVisible()
})
