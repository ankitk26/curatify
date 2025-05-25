import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/albums/$albumId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/albums/$albumId"!</div>
}
