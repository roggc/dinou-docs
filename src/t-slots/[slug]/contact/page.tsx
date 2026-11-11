import { Link, type PageProps } from "./dinou";

export default function Page({ params }: PageProps) {
    // params.slug;
    return <>
        <div>contact</div>
        <Link to="/t-slots/[slug]/contact/sub" params={{ slug: "dd" }}>sub</Link>
        <Link to="sub">sub</Link>
    </>
}