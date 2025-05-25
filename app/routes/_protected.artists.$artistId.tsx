import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/artists/$artistId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/artists/$artistId"!</div>
}
