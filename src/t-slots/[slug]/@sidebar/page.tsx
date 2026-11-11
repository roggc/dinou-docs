import { Link, type SlotProps } from "./dinou";

export default function Page({ params }: SlotProps) {
    return <><div>Side {params.slug}bar</div>
        <Link to="contact">contact</Link>
    </>;
}