/* eslint-disable react/prop-types */
import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { defineCustomElements } from '@deckdeckgo/highlight-code/dist/loader'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { postDate } from '../assets/css/posts.module.css'
import { badge } from '../assets/css/footer.module.css'
import {
  postArticle,
  postDateCategory,
  postContent,
} from '../assets/css/post.module.css'

defineCustomElements()

const BlogPostTemplate = ({
  data: { previous, next, markdownRemark: post, file },
}) => {
  return (
    <Layout>
      <article className={postArticle}>
        <section>
          <Img
            fluid={file.childImageSharp.fluid}
            objectFit="cover"
            objectPosition="50% 50%"
            alt={`${post.frontmatter.title} blog post cover.`}
          />

          <h1>{post.frontmatter.title}</h1>

          <p className={`${postDate} ${postDateCategory}`}>
            <span>{post.frontmatter.category}</span>
            &nbsp;&bull;&nbsp;
            <span>{post.frontmatter.date}</span>
          </p>

          {post.frontmatter.tags ? (
            <div>
              {post.frontmatter.tags.map(tag => (
                <span key={tag} className={badge}>
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            false
          )}
        </section>

        <section
          className={postContent}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <SEO
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $cover: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        cover
        tags
      }
    }
    file(relativePath: { eq: $cover }) {
      childImageSharp {
        fluid(maxWidth: 1600, maxHeight: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
