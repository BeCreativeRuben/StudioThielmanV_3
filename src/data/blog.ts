import { postsNl } from './blog/posts.nl-BE'
import { postsEn } from './blog/posts.en'

export type { BlogPost, BlogSection, BlogLocale } from './blog/types'
import type { BlogLocale, BlogPost } from './blog/types'

export const blogPosts: BlogPost[] = [...postsNl, ...postsEn]

function postLocale(post: BlogPost): BlogLocale {
  return post.locale ?? 'nl-BE'
}

const getVisibleBlogPosts = (): BlogPost[] => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return blogPosts.filter((post) => {
    if (post.visibleFrom) {
      const visibleFromDate = new Date(post.visibleFrom)
      visibleFromDate.setHours(0, 0, 0, 0)
      if (today < visibleFromDate) return false
    }
    return true
  })
}

export function getVisibleBlogPostsForLocale(locale: BlogLocale): BlogPost[] {
  return getVisibleBlogPosts().filter((post) => postLocale(post) === locale)
}

/** @deprecated Use getVisibleBlogPostsForLocale */
export const visibleBlogPosts = getVisibleBlogPostsForLocale('nl-BE')

export const getBlogPostBySlug = (slug: string, locale?: BlogLocale): BlogPost | undefined => {
  const posts = locale ? getVisibleBlogPostsForLocale(locale) : getVisibleBlogPosts()
  return posts.find((post) => post.slug === slug)
}

export const getLatestBlogPost = (locale: BlogLocale = 'nl-BE'): BlogPost | undefined => {
  const visible = getVisibleBlogPostsForLocale(locale)
  return visible.length > 0 ? visible[0] : undefined
}
