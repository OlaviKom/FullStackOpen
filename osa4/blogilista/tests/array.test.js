const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        assert.strictEqual(totalLikes([]), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        assert.strictEqual(totalLikes([{
            title: "Kaljaa ja makkaraa",
            author: "Sari Kalja",
            url: "kaljaajamakkaraa.fi",
            likes: 1234
        }]), 1234)
    })

    test('of a bigger list calculated  right', () => {
        assert.strictEqual(totalLikes([{
            title: "Kaljaa ja makkaraa",
            author: "Sari Kalja",
            url: "kaljaajamakkaraa.fi",
            likes: 2
        },
        {
            title: "Kaljaa ja makkaraa 2",
            author: "Sari Kalja2",
            url: "kaljaajamakkaraa2.fi",
            likes: 3
        },
        {
            title: "Kaljaa ja makkaraa 3",
            author: "Sari Kalja3",
            url: "kaljaajamakkaraa3.fi",
            likes: 5
        }
        ]), 10)
    })

})

describe('favorite blog', () => {
    test('of empty list is zero', () => {
        assert.strictEqual(favoriteBlog([]), 'zero blogs were given')
    })

    test('when list has only one blog equals of that', () => {
        assert.deepStrictEqual(favoriteBlog([{
            title: "Kaljaa ja makkaraa",
            author: "Sari Kalja",
            url: "kaljaajamakkaraa.fi",
            likes: 1234
        }]), {
            title: "Kaljaa ja makkaraa",
            author: "Sari Kalja",
            url: "kaljaajamakkaraa.fi",
            likes: 1234
        })
    })

    test('of a bigger list right favorite blog has found', () => {
        assert.deepStrictEqual(favoriteBlog([{
            title: "Kaljaa ja makkaraa",
            author: "Sari Kalja",
            url: "kaljaajamakkaraa.fi",
            likes: 2
        },
        {
            title: "Kaljaa ja makkaraa 2",
            author: "Sari Kalja2",
            url: "kaljaajamakkaraa2.fi",
            likes: 3
        },
        {
            title: "Kaljaa ja makkaraa 3",
            author: "Sari Kalja3",
            url: "kaljaajamakkaraa3.fi",
            likes: 5
        }
        ]), {
            title: "Kaljaa ja makkaraa 3",
            author: "Sari Kalja3",
            url: "kaljaajamakkaraa3.fi",
            likes: 5
        })
    })

})