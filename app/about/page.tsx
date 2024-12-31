import Link from 'next/link'
 
export default function Page() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/">Home</Link>
      <p>{process.env.NEXT_LOCAL}</p>
      <p>{process.env.NEXT_TEMP }</p>
    </div>
  )
}