import { Link } from "dinou"

export default function Page() {
    return <>
        <div>contact</div>
        <Link to="/t-slots/[slug]/contact/sub" params={{ slug: "dd" }}>sub</Link>
        <Link from="t-slots/[slug]/contact" to="sub">sub</Link>
    </>
}