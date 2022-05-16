import React from 'react'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { GetStaticProps } from 'next'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { Tags } from 'components/tags'
import { Count } from 'types/count'
import { MarkdownContentService } from 'services/content'
import { SEO } from 'components/SEO'
import { TopnavLayout } from 'components/layouts/topnav'

interface Props {
  categories: Array<Category>
  tags: Array<Count>
  languages: Array<Count>
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO title="Explore resources by tags" />

      <TopnavLayout title="Tags" className={styles.container}>
        <section>
          <p>Browse Web3 resources based on their tags.</p>
          <main>
            <Tags tags={props.tags} />
          </main>
        </section>

        <section>
          <p className={styles.second}>Or by programming language.</p>
          <main>
            <Tags tags={props.languages} />
          </main>
        </section>
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const tags = await service.GetTags()
  const languages = await service.GetLanguages()

  return {
    props: {
      categories,
      tags,
      languages,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
