import { render, screen, fireEvent } from '@testing-library/react'
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

test('renders all the info after pushing view button', () => {
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

  fireEvent.click(viewButton)

  const titleAuthorElement = screen.getByText('Component test Timo Testaaja')
  expect(titleAuthorElement).toBeDefined()

  const urlElement = screen.getByText('testaa.fi')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText(/likes 1/)
  expect(likesElement).toBeDefined()

  const userElement = screen.getByText('Testi User')
  expect(userElement).toBeDefined()

})