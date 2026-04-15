import { render } from '@testing-library/react'
import { ComponentShowcase, ShowcaseRow } from './index'

test('renders the component title', () => {
  const { getByText } = render(
    <ComponentShowcase title="Button" description="Triggers an action">
      <ShowcaseRow label="Default"><button>Click</button></ShowcaseRow>
    </ComponentShowcase>
  )
  expect(getByText('Button')).toBeInTheDocument()
})

test('renders the component description', () => {
  const { getByText } = render(
    <ComponentShowcase title="Button" description="Triggers an action">
      <ShowcaseRow label="Default"><button>Click</button></ShowcaseRow>
    </ComponentShowcase>
  )
  expect(getByText('Triggers an action')).toBeInTheDocument()
})

test('ShowcaseRow renders its label', () => {
  const { getByText } = render(
    <ComponentShowcase title="Button" description="Triggers an action">
      <ShowcaseRow label="Primary variant"><button>Click</button></ShowcaseRow>
    </ComponentShowcase>
  )
  expect(getByText('Primary variant')).toBeInTheDocument()
})

test('ShowcaseRow renders its children', () => {
  const { getByRole } = render(
    <ComponentShowcase title="Button" description="Triggers an action">
      <ShowcaseRow label="Default"><button>Click me</button></ShowcaseRow>
    </ComponentShowcase>
  )
  expect(getByRole('button', { name: 'Click me' })).toBeInTheDocument()
})
