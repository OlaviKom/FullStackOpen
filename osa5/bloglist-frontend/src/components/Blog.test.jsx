import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders title and author', () => {
  const blog = {
    title: 'Component test',
    author: 'Timo Testaaja',
    url: 'testaa.fi',
    likes: 1,
    user: { name: 'Testi User' }
  }


  render(<Blog blog={blog} />)

  screen.debug()

  const titleAuthorElement = screen.getByText('Component test Timo Testaaja')
  screen.debug(titleAuthorElement)
  expect(titleAuthorElement).toBeDefined()

  const urlElement = screen.queryByText('testaa.fi')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText(/likes 1/)
  expect(likesElement).toBeNull()

})

test('renders all the info after pushing view button', async () => {
  const blog = {
    title: 'Component test',
    author: 'Timo Testaaja',
    url: 'testaa.fi',
    likes: 1,
    user: { name: 'Testi User' }
  }

  const user = { name: 'Testi User' }

  render(<Blog blog={blog} user={user} />)

  screen.debug()

  const viewButton = screen.getByRole('button', 'view')

  const userE = userEvent.setup()

  await userE.click(viewButton)

  const titleAuthorElement = screen.getByText('Component test Timo Testaaja')
  expect(titleAuthorElement).toBeDefined()

  const urlElement = screen.getByText('testaa.fi')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText(/likes 1/)
  expect(likesElement).toBeDefined()

  const userElement = screen.getByText('Testi User')
  expect(userElement).toBeDefined()

})


test('calls twice eventHandler addLike when push twice like button', async () => {
  const blog = {
    title: 'Component test',
    author: 'Timo Testaaja',
    url: 'testaa.fi',
    likes: 1,
    user: { name: 'Testi User' }
  }

  const user = { name: 'Testi User' }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={user} addLike={mockHandler} />)

  const userE = userEvent.setup()
  const showButton = screen.getByRole('button','view')
  await userE.click(showButton)
  const likeButton = screen.getByText('like')
  await userE.click(likeButton)
  await userE.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})