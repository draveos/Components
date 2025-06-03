import { ComponentList } from "../components/ComponentList"

const categories = [
    {
        title: "UI Components",
        items: ["Button", "Input", "Card", "Modal", "Dropdown"],
    },
    {
        title: "Layout Components",
        items: ["Grid", "Container", "Sidebar", "Header", "Footer"],
    },
    {
        title: "Form Components",
        items: ["ContactForm", "LoginForm", "SearchBar", "FileUpload"],
    },
]

export function Database() {
    return (
        <div className="database">
            <h1>Component Database</h1>
            {categories.map((category) => (
                <ComponentList key={category.title} title={category.title} items={category.items} />
            ))}
        </div>
    )
}
