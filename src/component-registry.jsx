"use client"

import React from "react"

// Import all your components as you create them
import { PrimaryButton } from "./components/comp/buttons/PrimaryButton"
import { IconButton } from "./components/comp/buttons/IconButton"
import { LoadingButton } from "./components/comp/buttons/LoadingButton"
import { GradientButton } from "./components/comp/buttons/GradientButton"

import { BasicCard } from "./components/comp/cards/BasicCard"
import { ProductCard } from "./components/comp/cards/ProductCard"
import { ProfileCard } from "./components/comp/cards/ProfileCard"

import { ContactForm } from "./components/comp/forms/ContactForm"
import { LoginForm } from "./components/comp/forms/LoginForm"
import { SearchBar } from "./components/comp/forms/SearchBar"
import { FileUpload } from "./components/comp/forms/FileUpload"

import { ResizableContainer } from "./components/comp/layout/ResizableContainer"
import { Grid } from "./components/comp/layout/Grid"

import { Navbar } from "./components/comp/navigation/Navbar"
import { Breadcrumbs } from "./components/comp/navigation/Breadcrumbs"
import { TabNavigation } from "./components/comp/navigation/TabNavigation"

// New imports for Modals, Tables, Charts, Animations, Utilities, Experimental, Error
import { Modal } from "./components/comp/modals/Modal"
import { ConfirmationModal } from "./components/comp/modals/ConfirmationModal"

import { SimpleTable } from "./components/comp/tables/SimpleTable"
import { PaginatedTable } from "./components/comp/tables/PaginatedTable"

import { BarChart } from "./components/comp/charts/BarChart"
import { LineChart } from "./components/comp/charts/LineChart"

import { FadeIn } from "./components/comp/animations/FadeIn"
import { SlideIn } from "./components/comp/animations/SlideIn"
import { BounceIn } from "./components/comp/animations/BounceIn"
import { FlipCard } from "./components/comp/animations/FlipCard"
import { ParticleSystem } from "./components/comp/animations/ParticleSystem"
import { TypeWriter } from "./components/comp/animations/TypeWriter"
import { MorphingShapes } from "./components/comp/animations/MorphingShapes"
import { CelestialPet } from "./components/comp/animations/CelestialPet"

import { Tooltip } from "./components/comp/utilities/Tooltip"
import { Notification } from "./components/comp/utilities/Notification.jsx"

import { ExperimentalFeature } from "./components/comp/experimental/Experimental"
import { DynamicTypography } from "./components/comp/experimental/DynamicTypography"
import { GravityMode } from "./components/comp/experimental/GravityMode"
import { DontTouchButton } from "./components/comp/experimental/DontTouchButton"
import { ColorInverter } from "./components/comp/experimental/ColorInverter"

import { ErrorBoundary } from "./components/comp/error/ErrorBound"
import { NotFound } from "./components/comp/error/NotFound"
import { ServerError } from "./components/comp/error/ServerError"

// Create a controlled Modal demo component
function ModalDemo() {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    return (
        <div style={{ padding: "1rem", textAlign: "center" }}>
            <button
                className="cosmic-btn cosmic-btn--primary cosmic-btn--large"
                onClick={() => setIsModalOpen(true)}
                style={{
                    marginBottom: "1rem",
                    padding: "1rem 2rem",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                }}
            >
                Open Modal
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Demo Modal" size="medium">
                <p style={{ color: "#fef3c7", marginBottom: "1rem" }}>
                    This is a controlled modal that only appears when you click the button!
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                    <button className="cosmic-btn cosmic-btn--primary" onClick={() => setIsModalOpen(false)}>
                        Close Modal
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export const componentCategories = [
    { id: "all", name: "All Components", icon: "⟡", description: "Complete component collection" },
    {
        id: "buttons",
        name: "Buttons",
        icon: "🔘",
        description: "Interactive button components with various styles and states",
        components: [
            {
                name: "PrimaryButton",
                component: PrimaryButton,
                description: "Main action button with cosmic glow effect",
                props: { children: "Click Me", onClick: () => console.log("Clicked!") },
                tags: ["primary", "action", "glow"],
            },
            {
                name: "IconButton",
                component: IconButton,
                description: "Button with icon and text",
                props: { icon: "⭐", children: "Favorite", onClick: () => console.log("Favorited!") },
                tags: ["icon", "secondary"],
            },
            {
                name: "LoadingButton",
                component: LoadingButton,
                description: "Button with loading state animation",
                props: {
                    children: "Submit",
                    loadingText: "Processing...",
                    onClick: () => new Promise((resolve) => setTimeout(resolve, 2000)),
                },
                tags: ["loading", "async", "form"],
            },
            {
                name: "GradientButton",
                component: GradientButton,
                description: "Button with animated gradient background",
                props: { children: "Gradient Magic", onClick: () => console.log("Magic!") },
                tags: ["gradient", "animated", "special"],
            },
        ],
    },
    {
        id: "cards",
        name: "Cards",
        icon: "🃏",
        description: "Content containers with various layouts and styles",
        components: [
            {
                name: "BasicCard",
                component: BasicCard,
                description: "Simple card with title, content, and action",
                props: {
                    title: "Example Card",
                    content: "This card contains stellar information about something.",
                    buttonText: "Explore",
                    onButtonClick: () => console.log("Exploring..."),
                },
                tags: ["basic", "content", "action"],
            },
            {
                name: "ProductCard",
                component: ProductCard,
                description: "E-commerce product display card",
                props: {
                    product: {
                        name: "Stellar Widget",
                        price: 99.99,
                        originalPrice: 129.99,
                        rating: 4.8,
                        image: "🌟",
                        badge: "Popular",
                    },
                    showBadge: true,
                    onAddToCart: (product) => console.log("Added to cart:", product),
                },
                tags: ["product", "ecommerce", "pricing"],
            },
            {
                name: "ProfileCard",
                component: ProfileCard,
                description: "User profile display card",
                props: {
                    profile: {
                        name: "SeJin Kim",
                        role: "amateur coder",
                        avatar: ";)",
                        stats: { projects: 2, followers: "1.2k" },
                        isOnline: true,
                    },
                    onFollow: () => console.log("Following user"),
                },
                tags: ["profile", "user", "social"],
            },
        ],
    },
    {
        id: "forms",
        name: "Forms",
        icon: "📝",
        description: "Input forms and form elements",
        components: [
            {
                name: "ContactForm",
                component: ContactForm,
                description: "Complete contact form with validation",
                props: { onSubmit: (data) => console.log("Contact form:", data) },
                tags: ["contact", "validation", "email"],
            },
            {
                name: "LoginForm",
                component: LoginForm,
                description: "User authentication form",
                props: { onSubmit: (data) => console.log("Login:", data) },
                tags: ["login", "auth", "security"],
            },
            {
                name: "SearchBar",
                component: SearchBar,
                description: "Search input with suggestions",
                props: {
                    placeholder: "Search the cosmos...",
                    suggestions: ["Stars", "Planets", "Galaxies", "Nebulae"],
                    onSearch: (query) => console.log("Searching:", query),
                },
                tags: ["search", "suggestions", "filter"],
            },
            {
                name: "FileUpload",
                component: FileUpload,
                description: "Drag and drop file upload",
                props: {
                    accept: "image/*",
                    multiple: true,
                    onFileSelect: (files) => console.log("Files:", files),
                },
                tags: ["upload", "files", "drag-drop"],
            },
        ],
    },
    {
        id: "layout",
        name: "Layout",
        icon: "📐",
        description: "Structural layout components",
        components: [

               {
                 name: "ResizableContainer",
        component: ResizableContainer,
        description: "Drag to resize & see breakpoint in real time",
        props: {
               children: (
                 <div>
                       <h3 style={{ marginBottom:"0.5rem" }}>Resizable Box</h3>
                       <p>This container can be stretched! Drag the right edge.</p>
                     </div>
               ),
               defaultWidth: 800,
             },
            tags: ["container","responsive","interactive","resizable"],
       },
            {
                name: "Grid",
                component: Grid,
                description: "Flexible grid system",
                props: {
                    columns: 3,
                    gap: "1rem",
                    children: Array.from({ length: 6 }, (_, i) => (
                        <div
                            key={i}
                            style={{
                                padding: "1rem",
                                background: "rgba(251, 191, 36, 0.1)",
                                borderRadius: "8px",
                                textAlign: "center",
                            }}
                        >
                            Item {i + 1}
                        </div>
                    )),
                },
                tags: ["grid", "responsive", "layout"],
            },
        ],
    },
    {
        id: "navigation",
        name: "Navigation",
        icon: "🧭",
        description: "Navigation and menu components",
        components: [
            {
                name: "Navbar",
                component: Navbar,
                description: "Responsive navigation bar",
                props: {
                    brand: "Cosmic UI",
                    links: [
                        { text: "Home", href: "#", active: true },
                        { text: "Components", href: "#" },
                        { text: "Documentation", href: "#" },
                        { text: "About", href: "#" },
                    ],
                },
                tags: ["navbar", "responsive", "menu"],
            },
            {
                name: "Breadcrumbs",
                component: Breadcrumbs,
                description: "Navigation breadcrumb trail",
                props: {
                    items: [
                        { text: "Home", href: "#" },
                        { text: "Components", href: "#" },
                        { text: "Navigation", href: "#" },
                        { text: "Breadcrumbs" },
                    ],
                },
                tags: ["breadcrumbs", "navigation", "trail"],
            },
            {
                name: "TabNavigation",
                component: TabNavigation,
                description: "Tabbed content navigation",
                props: {
                    tabs: [
                        {
                            label: "Overview",
                            content: <div style={{ padding: "1rem" }}>Overview content here</div>,
                        },
                        {
                            label: "Features",
                            content: <div style={{ padding: "1rem" }}>Features content here</div>,
                        },
                        {
                            label: "Examples",
                            content: <div style={{ padding: "1rem" }}>Examples content here</div>,
                        },
                    ],
                },
                tags: ["tabs", "content", "switching"],
            },
        ],
    },
    {
        id: "modals",
        name: "Modals",
        icon: "🪟",
        description: "Dialog and modal components for user interaction",
        components: [
            {
                name: "Modal",
                component: ModalDemo, // Use the controlled demo component instead
                description: "A modal dialog component with proper state management",
                props: {},
                tags: ["modal", "dialog", "overlay"],
            },
            {
                name: "ConfirmationModal",
                component: ({ children, ...props }) => (
                    <div style={{ padding: "1rem", textAlign: "center" }}>
                        <p style={{ color: "#fef3c7", marginBottom: "1rem" }}>
                            This is a confirmation modal preview (normally triggered by user actions)
                        </p>
                        <ConfirmationModal
                            onConfirm={() => console.log("Confirmed!")}
                            onCancel={() => console.log("Cancelled!")}
                            title="Confirm Action"
                            message="Are you sure you want to proceed with this cosmic action?"
                            confirmText="Proceed"
                            cancelText="Abort"
                            type="warning"
                        />
                    </div>
                ),
                props: {},
                tags: ["modal", "confirmation", "alert"],
            },
        ],
    },
    {
        id: "tables",
        name: "Tables",
        icon: "📊",
        description: "Components for displaying tabular data",
        components: [
            {
                name: "SimpleTable",
                component: SimpleTable,
                props: {
                    headers: ["Name", "Type", "Status"],
                    data: [
                        ["Andromeda", "Galaxy", "Active"],
                        ["Orion Nebula", "Nebula", "Forming"],
                        ["Black Hole X", "Black Hole", "Stable"],
                    ],
                },
                tags: ["table", "data", "display"],
            },
            {
                name: "PaginatedTable",
                component: PaginatedTable,
                props: {
                    headers: ["Planet", "Star", "Distance (LY)"],
                    data: [
                        ["Earth", "Sun", "0.0000158"],
                        ["Mars", "Sun", "0.000026"],
                        ["Proxima b", "Proxima Centauri", "4.2"],
                        ["Kepler-186f", "Kepler-186", "500"],
                        ["TRAPPIST-1e", "TRAPPIST-1", "39"],
                        ["Gliese 581g", "Gliese 581", "20"],
                        ["HD 209458 b", "HD 209458", "159"],
                        ["WASP-12b", "WASP-12", "871"],
                        ["51 Pegasi b", "51 Pegasi", "50"],
                        ["CoRoT-7b", "CoRoT-7", "489"],
                    ],
                    itemsPerPage: 3,
                },
                tags: ["table", "pagination", "data"],
            },
        ],
    },
    {
        id: "charts",
        name: "Charts",
        icon: "📈",
        description: "Data visualization components",
        components: [
            {
                name: "BarChart",
                component: BarChart,
                props: {
                    data: [
                        { label: "Stars", value: 120 },
                        { label: "Planets", value: 80 },
                        { label: "Moons", value: 150 },
                        { label: "Asteroids", value: 90 },
                    ],
                    title: "Celestial Body Count",
                },
                tags: ["chart", "bar", "data-viz"],
            },
            {
                name: "LineChart",
                component: LineChart,
                props: {
                    data: [
                        { x: "Jan", y: 10 },
                        { x: "Feb", y: 40 },
                        { x: "Mar", y: 25 },
                        { x: "Apr", y: 60 },
                        { x: "May", y: 30 },
                    ],
                    title: "Cosmic Temperature Fluctuation",
                },
                tags: ["chart", "line", "data-viz"],
            },
        ],
    },
    {
        id: "animations",
        name: "Animations",
        icon: "✨",
        description: "Components for adding visual flair and transitions",
        components: [
            {
                name: "FadeIn",
                component: ({ children, ...props }) => (
                    <FadeIn {...props}>
                        <div style={{ padding: "1rem", background: "rgba(251, 191, 36, 0.1)", borderRadius: "8px" }}>
                            <p style={{ color: "#fef3c7" }}>This content fades in gracefully.</p>
                        </div>
                    </FadeIn>
                ),
                props: { duration: 1.5, delay: 0.5 },
                tags: ["animation", "fade", "transition"],
            },
            {
                name: "SlideIn",
                component: ({ children, ...props }) => (
                    <SlideIn {...props}>
                        <div style={{ padding: "1rem", background: "rgba(139, 92, 246, 0.1)", borderRadius: "8px" }}>
                            <p style={{ color: "#fef3c7" }}>This content slides in from the left.</p>
                        </div>
                    </SlideIn>
                ),
                props: { direction: "left", duration: 1.2, delay: 0.3 },
                tags: ["animation", "slide", "transition"],
            },
            {
                name: "BounceIn",
                component: ({ children, ...props }) => (
                    <BounceIn {...props}>
                        <div style={{ padding: "1rem", background: "rgba(34, 197, 94, 0.1)", borderRadius: "8px" }}>
                            <p style={{ color: "#fef3c7" }}>This content bounces in with energy!</p>
                        </div>
                    </BounceIn>
                ),
                props: { direction: "up", duration: 0.8, delay: 0.2 },
                tags: ["animation", "bounce", "entrance"],
            },
            {
                name: "FlipCard",
                component: FlipCard,
                props: {
                    frontContent: (
                        <div
                            style={{
                                padding: "2rem",
                                textAlign: "center",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                borderRadius: "12px",
                                color: "white",
                            }}
                        >
                            <h3 style={{ margin: "0 0 1rem 0" }}>Front Side</h3>
                            <p style={{ margin: 0 }}>Click to flip!</p>
                        </div>
                    ),
                    backContent: (
                        <div
                            style={{
                                padding: "2rem",
                                textAlign: "center",
                                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                borderRadius: "12px",
                                color: "white",
                            }}
                        >
                            <h3 style={{ margin: "0 0 1rem 0" }}>Back Side</h3>
                            <p style={{ margin: 0 }}>Amazing flip effect!</p>
                        </div>
                    ),
                },
                tags: ["animation", "flip", "interactive"],
            },
            {
                name: "ParticleSystem",
                component: ParticleSystem,
                props: {
                       initialCount : 50,      // or keep particleCount – 둘 다 OK
                       mouseMode    : "repel", // "attract" 로 바꿔도 동작
                       interactive  : true,
                },
                tags: ["animation", "particles", "interactive"],
            },
            {
                name: "TypeWriter",
                component: TypeWriter,
                props: {
                    texts: ["Welcome to the component library!", "Explore amazing animations!", "Create something beautiful!"],
                    speed: 80,
                    deleteSpeed: 50,
                },
                tags: ["animation", "typewriter", "text"],
            },
            {
                name: "MorphingShapes",
                component: MorphingShapes,
                props: {
                    shapes: ["circle", "square", "triangle", "star"],
                    autoMorph: true,
                    morphSpeed: 2000,
                },
                tags: ["animation", "morph", "shapes"],
            },
            {
                name: "CelestialPet",
                component: CelestialPet,
                props: {},
                tags: ["animation", "interactive", "pet", "celestial"],
            },
        ],
    },
    {
        id: "utilities",
        name: "Utilities",
        icon: "🔧",
        description: "Small, reusable helper components",
        components: [
            {
                name: "Tooltip",
                component: Tooltip,
                props: {
                    content: "This is a cosmic tooltip!",
                    children: (
                        <button
                            className="cosmic-btn cosmic-btn--secondary cosmic-btn--large"
                            style={{ padding: "1rem 2rem", fontSize: "1.1rem", fontWeight: "600" }}
                        >
                            Hover Me
                        </button>
                    ),
                },
                tags: ["utility", "tooltip", "info"],
            },
            {
                name: "Notification",
                component: Notification,
                props: {
                    items: [
                        {id: 1, label: " New product launched!", variant: "primary"},
                        {id: 2, label: " Component page updated", variant: "info"},
                        {id: 3, label: " All systems green", variant: "success"},
                    ],
                },
                tags: ["utility", "Notification", "status"],
            },
        ],
    },
    {
        id: "experimental",
        name: "Experimental",
        icon: "🧪",
        description: "Cutting-edge components under development",
        components: [
            {
                name: "ExperimentalFeature",
                component: ExperimentalFeature,
                description: "A highly unstable, yet promising, new component",
                props: {
                    title: "Quantum Entanglement Module",
                    description: "A highly unstable, yet promising, new component.",
                },
                tags: ["experimental", "beta", "future"],
            },
            {
                name: "DynamicTypography",
                component: DynamicTypography,
                description: "Interactive typography with stunning animations",
                props: {},
                tags: ["experimental", "typography", "animation", "interactive"],
            },
            {
                name: "GravityMode",
                component: GravityMode,
                description: "Experience heavy scrolling with realistic gravity physics",
                props: {},
                tags: ["experimental", "physics", "gravity", "interactive"],
            },
            {
                name: "DontTouchButton",
                component: DontTouchButton,
                description: "A button you absolutely should NOT press... or should you?",
                props: {},
                tags: ["experimental", "chaos", "warning", "destructive"],
            },
            {
                name: "ColorInverter",
                component: ColorInverter,
                description: "Reality distortion field - transform your visual experience",
                props: {},
                tags: ["experimental", "visual", "filter", "distortion"],
            },
        ],
    },
    {
        id: "error",
        name: "Error",
        icon: "💥",
        description: "Components for displaying error states and handling exceptions",
        components: [
            {
                name: "ErrorBoundary",
                component: ({ children, ...props }) => (
                    <ErrorBoundary {...props}>
                        <div style={{ padding: "2rem", color: "#fef3c7", textAlign: "center" }}>
                            <p>This content is wrapped in an Error Boundary.</p>
                            <button
                                onClick={() => {
                                    throw new Error("Test error: Cosmic ray detected!")
                                }}
                                className="cosmic-btn cosmic-btn--primary cosmic-btn--large"
                                style={{
                                    marginTop: "1rem",
                                    background: "#ef4444",
                                    padding: "1rem 2rem",
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                }}
                            >
                                Trigger Error
                            </button>
                        </div>
                    </ErrorBoundary>
                ),
                props: {},
                tags: ["error", "boundary", "fallback"],
            },
            {
                name: "NotFound",
                component: NotFound,
                props: {
                    title: "404 - Page Not Found",
                    message: "The page you're looking for is not here!",
                    onGoHome: () => console.log("Going home"),
                },
                tags: ["404", "not-found", "error"],
            },
            {
                name: "ServerError",
                component: ServerError,
                props: {
                    code: 500,
                    title: "Internal Server Error",
                    message: "Our servers are experiencing cosmic interference.",
                    onRetry: () => console.log("Retrying..."),
                },
                tags: ["500", "server-error", "error"],
            },
        ],
    },
]

export const getAllComponents = () => {
    return componentCategories.reduce((acc, category) => {
        // Exclude the "All Components" category itself from the flat list
        if (category.id === "all") return acc
        return [...acc, ...category.components.map((comp) => ({ ...comp, category: category.id }))]
    }, [])
}

export const getComponentsByCategory = (categoryId) => {
    if (categoryId === "all") return getAllComponents()
    const category = componentCategories.find((cat) => cat.id === categoryId)
    return category ? category.components : []
}

export const searchComponents = (query) => {
    if (!query || typeof query !== "string") {
        return []
    }

    const allComponents = getAllComponents()
    const lowerQuery = query.toLowerCase()

    return allComponents.filter((comp) => {
        // Check name
        if (comp.name && comp.name.toLowerCase().includes(lowerQuery)) {
            return true
        }

        // Check description
        if (comp.description && comp.description.toLowerCase().includes(lowerQuery)) {
            return true
        }

        // Check tags with proper safety checks
        if (comp.tags && Array.isArray(comp.tags)) {
            return comp.tags.some((tag) => {
                return tag && typeof tag === "string" && tag.toLowerCase().includes(lowerQuery)
            })
        }

        return false
    })
}
