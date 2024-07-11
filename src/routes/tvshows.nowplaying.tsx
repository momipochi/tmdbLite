import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tvshows/nowplaying')({
  component: () => <div>Hello /tvshows/nowplaying!</div>
})