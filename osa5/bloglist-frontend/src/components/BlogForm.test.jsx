import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogFrom from './BlogForm'
import { expect } from 'vitest'

test('form calls callback function whit the right info when new blog is created', async () => {
  const userE = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogFrom createBlog={createBlog}/>)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const createButton = screen.getByText('create')

  await userE.type(titleInput, 'testing to create blog')
  await userE.type(authorInput, 'Caarina Testing')
  await userE.type(urlInput, 'testing.fi')
  await userE.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing to create blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Caarina Testing')
  expect(createBlog.mock.calls[0][0].url).toBe('testing.fi')

  screen.debug()

})