export function ComponentList({ title, items }) {
    return (
        <div className="component-list">
            <h2>{title}</h2>
            <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
