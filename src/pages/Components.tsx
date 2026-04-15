import { useState } from 'react'
import Button from '../components/Button'
import { Heading, Text } from '../components/Typography'
import Input from '../components/Input'
import { ComponentShowcase, ShowcaseRow } from '../components/ComponentShowcase'
import StarIcon from '../icons/star.svg?react'

export default function Components() {
  const [email, setEmail] = useState('')

  return (
    <main className="px-6 py-12 flex flex-col gap-12">
      <ComponentShowcase title="Button" description="Triggers an action or event">
        <ShowcaseRow label="Primary">
          <Button variant="primary">Primary</Button>
        </ShowcaseRow>
        <ShowcaseRow label="Secondary">
          <Button variant="secondary">Secondary</Button>
        </ShowcaseRow>
        <ShowcaseRow label="Disabled">
          <Button disabled>Disabled</Button>
        </ShowcaseRow>
      </ComponentShowcase>

      <ComponentShowcase title="Typography" description="Heading and Text primitives">
        <ShowcaseRow label="Heading h1">
          <Heading as="h1">Heading 1</Heading>
        </ShowcaseRow>
        <ShowcaseRow label="Heading h2">
          <Heading as="h2">Heading 2</Heading>
        </ShowcaseRow>
        <ShowcaseRow label="Heading h3">
          <Heading as="h3">Heading 3</Heading>
        </ShowcaseRow>
        <ShowcaseRow label="Text base">
          <Text>Body text at base size</Text>
        </ShowcaseRow>
        <ShowcaseRow label="Text sm">
          <Text size="sm">Small text</Text>
        </ShowcaseRow>
        <ShowcaseRow label="Text lg">
          <Text size="lg">Large text</Text>
        </ShowcaseRow>
      </ComponentShowcase>

      <ComponentShowcase title="Input" description="Text input with label and validation">
        <ShowcaseRow label="Default">
          <Input id="demo-email" label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </ShowcaseRow>
        <ShowcaseRow label="Disabled">
          <Input id="demo-disabled" label="Disabled field" disabled value="Cannot edit" />
        </ShowcaseRow>
        <ShowcaseRow label="Error">
          <Input id="demo-error" label="Email" type="email" value="not-an-email" error="Enter a valid email address" />
        </ShowcaseRow>
      </ComponentShowcase>

      <ComponentShowcase title="Icons" description="SVG icons via vite-plugin-svgr">
        <ShowcaseRow label="Star">
          <StarIcon width={24} height={24} />
        </ShowcaseRow>
      </ComponentShowcase>
    </main>
  )
}
