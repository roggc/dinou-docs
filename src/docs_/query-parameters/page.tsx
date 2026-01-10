"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { Search, Info, Globe } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "basic-usage", title: "Basic Usage", level: 2 },
  { id: "multiple-parameters", title: "Multiple Parameters", level: 2 },
  {
    id: "combining-with-params",
    title: "Combining with Route Params",
    level: 2,
  },
  { id: "ssg-behavior", title: "SSG Behavior", level: 2 },
  { id: "common-patterns", title: "Common Patterns", level: 2 },
];

export default function QueryParametersPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Query Parameters</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to work with URL query parameters in Dinou applications.
            </p>
          </div>

          <div className="prose">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Query parameters are automatically extracted from the URL and
                passed to your components as the <code>query</code> prop. All
                components (<code>page.tsx</code>, <code>layout.tsx</code>, and{" "}
                <code>not_found.tsx</code>) receive this prop automatically.
              </p>

              <div className="not-prose mb-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-blue-600" />
                      <CardTitle>Query Parameter Examples</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <code>/search?q=react</code> →{" "}
                        <code>{`{ query: { q: "react" } }`}</code>
                      </p>
                      <p>
                        <code>/products?category=tech&sort=price</code> →{" "}
                        <code>{`{ query: { category: "tech", sort: "price" } }`}</code>
                      </p>
                      <p>
                        <code>/blog?page=2&limit=10&author=john</code> →{" "}
                        <code>{`{ query: { page: "2", limit: "10", author: "john" } }`}</code>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="not-prose">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Query parameters are always
                  strings. Convert them to numbers or other types as needed in
                  your components.
                </AlertDescription>
              </Alert>
            </section>

            <section id="basic-usage">
              <h2>Basic Usage</h2>
              <p>
                Query parameters are passed to your component as the{" "}
                <code>query</code> prop:
              </p>

              <h3>Search Page Example</h3>

              <CodeBlock language="typescript">{`// src/search/page.tsx
"use client";

export default function SearchPage({ 
  query 
}: { 
  query: { 
    q?: string; 
    type?: string; 
  } 
}) {
  return (
    <div>
      <h1>Search Results</h1>
      
      {query.q ? (
        <div>
          <p>Searching for: "{query.q}"</p>
          {query.type && <p>Type: {query.type}</p>}
          
          {/* Search results would go here */}
          <div className="results">
            <p>Found results for "{query.q}"</p>
          </div>
        </div>
      ) : (
        <div>
          <p>Enter a search term to get started</p>
          <form>
            <input type="text" placeholder="Search..." />
            <button type="submit">Search</button>
          </form>
        </div>
      )}
    </div>
  );
}`}</CodeBlock>

              <p>This page will handle URLs like:</p>
              <ul>
                <li>
                  <code>/search</code> - Shows search form
                </li>
                <li>
                  <code>/search?q=react</code> - Shows results for "react"
                </li>
                <li>
                  <code>/search?q=react&type=tutorial</code> - Shows tutorial
                  results for "react"
                </li>
              </ul>

              <h3>Filtering and Sorting</h3>

              <CodeBlock language="typescript">{`// src/products/page.tsx
"use client";

export default function ProductsPage({ 
  query 
}: { 
  query: { 
    category?: string;
    sort?: string;
    order?: string;
    min_price?: string;
    max_price?: string;
  } 
}) {
  // Convert string parameters to appropriate types
  const minPrice = query.min_price ? parseFloat(query.min_price) : undefined;
  const maxPrice = query.max_price ? parseFloat(query.max_price) : undefined;
  const sortOrder = query.order === 'desc' ? 'desc' : 'asc';

  return (
    <div>
      <h1>Products</h1>
      
      {/* Display current filters */}
      <div className="filters-display">
        {query.category && (
          <span className="filter-tag">
            Category: {query.category}
          </span>
        )}
        {query.sort && (
          <span className="filter-tag">
            Sort: {query.sort} ({sortOrder})
          </span>
        )}
        {minPrice && (
          <span className="filter-tag">
            Min Price: \${minPrice}
          </span>
        )}
        {maxPrice && (
          <span className="filter-tag">
            Max Price: \${maxPrice}
          </span>
        )}
      </div>
      
      {/* Filter controls */}
      <div className="filters">
        <a href="/products?category=electronics">Electronics</a>
        <a href="/products?category=clothing">Clothing</a>
        <a href="/products?sort=price&order=asc">Price: Low to High</a>
        <a href="/products?sort=price&order=desc">Price: High to Low</a>
      </div>
      
      {/* Products would be rendered here based on filters */}
      <div className="products">
        <p>Showing products with current filters</p>
      </div>
    </div>
  );
}`}</CodeBlock>
            </section>

            <section id="multiple-parameters">
              <h2>Multiple Parameters</h2>
              <p>
                You can handle multiple query parameters to create complex
                filtering and pagination systems:
              </p>

              <CodeBlock language="typescript">{`// src/blog/page.tsx
"use client";

export default function BlogPage({ 
  query 
}: { 
  query: { 
    page?: string;
    category?: string;
    tag?: string;
    author?: string;
    search?: string;
    sort?: string;
    year?: string;
  } 
}) {
  // Parse and validate parameters
  const currentPage = Math.max(1, parseInt(query.page || '1'));
  const postsPerPage = 10;
  
  // Build filter description
  const getFilterDescription = () => {
    const filters = [];
    if (query.category) filters.push(\`category: \${query.category}\`);
    if (query.tag) filters.push(\`tag: \${query.tag}\`);
    if (query.author) filters.push(\`author: \${query.author}\`);
    if (query.search) filters.push(\`search: "\${query.search}"\`);
    if (query.year) filters.push(\`year: \${query.year}\`);
    
    return filters.length > 0 ? \`Filtered by \${filters.join(', ')}\` : 'All posts';
  };

  // Build URL helper
  const buildUrl = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    
    // Merge existing params with new ones
    Object.entries({ ...query, ...newParams }).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });
    
    return \`/blog?\${params.toString()}\`;
  };

  return (
    <div>
      <h1>Blog</h1>
      
      {/* Current filters display */}
      <div className="current-filters">
        <p>{getFilterDescription()}</p>
        {Object.keys(query).length > 0 && (
          <a href="/blog">Clear all filters</a>
        )}
      </div>
      
      {/* Filter controls */}
      <div className="filters">
        <div className="filter-group">
          <h3>Categories</h3>
          <a href={buildUrl({ category: 'tech', page: undefined })}>Tech</a>
          <a href={buildUrl({ category: 'design', page: undefined })}>Design</a>
          <a href={buildUrl({ category: 'business', page: undefined })}>Business</a>
        </div>
        
        <div className="filter-group">
          <h3>Sort</h3>
          <a href={buildUrl({ sort: 'date', page: undefined })}>By Date</a>
          <a href={buildUrl({ sort: 'popularity', page: undefined })}>By Popularity</a>
          <a href={buildUrl({ sort: 'title', page: undefined })}>By Title</a>
        </div>
      </div>
      
      {/* Search */}
      <div className="search">
        <form method="get">
          {/* Preserve existing filters */}
          {query.category && <input type="hidden" name="category" value={query.category} />}
          {query.tag && <input type="hidden" name="tag" value={query.tag} />}
          {query.author && <input type="hidden" name="author" value={query.author} />}
          
          <input 
            type="text" 
            name="search" 
            defaultValue={query.search || ''} 
            placeholder="Search posts..." 
          />
          <button type="submit">Search</button>
        </form>
      </div>
      
      {/* Posts */}
      <div className="posts">
        <p>Page {currentPage} of blog posts</p>
        {/* Posts would be rendered here */}
      </div>
      
      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <a href={buildUrl({ page: (currentPage - 1).toString() })}>
            ← Previous
          </a>
        )}
        <span>Page {currentPage}</span>
        <a href={buildUrl({ page: (currentPage + 1).toString() })}>
          Next →
        </a>
      </div>
    </div>
  );
}`}</CodeBlock>
            </section>

            <section id="combining-with-params">
              <h2>Combining with Route Params</h2>
              <p>
                You can use both route parameters and query parameters together:
              </p>

              <CodeBlock language="typescript">{`// src/blog/[category]/page.tsx
"use client";

export default function CategoryPage({ 
  params,
  query 
}: { 
  params: { category: string };
  query: { 
    page?: string;
    sort?: string;
    tag?: string;
    search?: string;
  };
}) {
  const currentPage = parseInt(query.page || '1');
  const sortBy = query.sort || 'date';

  return (
    <div>
      <h1>Category: {params.category}</h1>
      
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <a href="/blog">All Posts</a>
        <span> > </span>
        <span>{params.category}</span>
      </nav>
      
      {/* Query-based filters */}
      <div className="filters">
        {query.search && (
          <p>Search results for "{query.search}" in {params.category}</p>
        )}
        {query.tag && (
          <p>Tagged with: {query.tag}</p>
        )}
        
        <div className="sort-options">
          <a href={\`/blog/\${params.category}?sort=date\`}>
            Sort by Date
          </a>
          <a href={\`/blog/\${params.category}?sort=popularity\`}>
            Sort by Popularity
          </a>
        </div>
      </div>
      
      {/* Search within category */}
      <form method="get">
        <input 
          type="text" 
          name="search" 
          defaultValue={query.search || ''} 
          placeholder={\`Search in \${params.category}...\`} 
        />
        {query.sort && <input type="hidden" name="sort" value={query.sort} />}
        <button type="submit">Search</button>
      </form>
      
      {/* Posts */}
      <div className="posts">
        <p>
          {params.category} posts (page {currentPage}, sorted by {sortBy})
        </p>
      </div>
    </div>
  );
}`}</CodeBlock>

              <h3>E-commerce Product Example</h3>

              <CodeBlock language="typescript">{`// src/products/[category]/[id]/page.tsx
"use client";

export default function ProductPage({ 
  params,
  query 
}: { 
  params: { category: string; id: string };
  query: { 
    variant?: string;
    color?: string;
    size?: string;
    ref?: string; // referrer tracking
  };
}) {
  return (
    <div>
      <nav className="breadcrumb">
        <a href="/products">Products</a>
        <span> > </span>
        <a href={\`/products/\${params.category}\`}>{params.category}</a>
        <span> > </span>
        <span>Product {params.id}</span>
      </nav>
      
      <h1>Product {params.id}</h1>
      <p>Category: {params.category}</p>
      
      {/* Product variants based on query params */}
      {query.variant && <p>Variant: {query.variant}</p>}
      {query.color && <p>Color: {query.color}</p>}
      {query.size && <p>Size: {query.size}</p>}
      
      {/* Referrer tracking */}
      {query.ref && (
        <div className="referrer-info">
          <p>Referred from: {query.ref}</p>
        </div>
      )}
      
      {/* Product options */}
      <div className="product-options">
        <h3>Available Options</h3>
        <div className="colors">
          <a href={\`/products/\${params.category}/\${params.id}?color=red\`}>
            Red
          </a>
          <a href={\`/products/\${params.category}/\${params.id}?color=blue\`}>
            Blue
          </a>
        </div>
        
        <div className="sizes">
          <a href={\`/products/\${params.category}/\${params.id}?size=small\`}>
            Small
          </a>
          <a href={\`/products/\${params.category}/\${params.id}?size=large\`}>
            Large
          </a>
        </div>
      </div>
    </div>
  );
}`}</CodeBlock>
            </section>

            <section id="ssg-behavior">
              <h2>SSG Behavior</h2>
              <p>
                Query parameters affect how Static Site Generation (SSG) works
                in Dinou:
              </p>

              <Alert className="not-prose">
                <Globe className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Pages with query parameters are
                  rendered dynamically, even if they would normally be
                  statically generated. This affects FCP (First Contentful
                  Paint).
                </AlertDescription>
              </Alert>

              <h3>Static Route with Query Parameters</h3>

              <CodeBlock language="typescript">{`// src/blog/page_functions.ts
export async function getProps() {
  const posts = await fetchPosts();
  return { page: { posts } };
}

// This enables SSG for /blog
// But /blog?category=tech will be rendered dynamically`}</CodeBlock>

              <h3>Dynamic Route with Query Parameters</h3>

              <CodeBlock language="typescript">{`// src/blog/[category]/page_functions.ts
export async function getProps(params: { category: string }) {
  const posts = await fetchPostsByCategory(params.category);
  return { page: { posts } };
}

export function getStaticPaths() {
  return ["tech", "design", "business"];
}

// This enables SSG for:
// - /blog/tech
// - /blog/design  
// - /blog/business
//
// But these will be rendered dynamically:
// - /blog/tech?sort=date
// - /blog/design?page=2`}</CodeBlock>

              <h3>Optimizing for Query Parameters</h3>
              <p>
                If you frequently use query parameters, consider using Suspense
                for data fetching:
              </p>
              <CodeBlock language="typescript">{`// src/blog/page.tsx
"use client";

import { Suspense } from 'react';

export default function BlogPage({ query }) {
  return (
    <div>
      <h1>Blog</h1>
      
      {/* Static content loads immediately */}
      <nav>
        <a href="/blog">All Posts</a>
        <a href="/blog?category=tech">Tech</a>
        <a href="/blog?category=design">Design</a>
      </nav>
      
      {/* Dynamic content with Suspense */}
      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogPosts query={query} />
      </Suspense>
    </div>
  );
}`}</CodeBlock>
            </section>

            <section id="common-patterns">
              <h2>Common Patterns</h2>

              <h3>1. Search with Filters</h3>

              <CodeBlock language="typescript">{`// URL: /search?q=laptop&category=electronics&min_price=500&max_price=2000
export default function SearchPage({ query }) {
  const searchTerm = query.q || '';
  const category = query.category;
  const minPrice = query.min_price ? parseFloat(query.min_price) : undefined;
  const maxPrice = query.max_price ? parseFloat(query.max_price) : undefined;

  return (
    <div>
      <h1>Search Results</h1>
      {searchTerm && <p>Searching for: "{searchTerm}"</p>}
      
      <div className="active-filters">
        {category && <span>Category: {category}</span>}
        {minPrice && <span>Min: \${minPrice}</span>}
        {maxPrice && <span>Max: \${maxPrice}</span>}
      </div>
    </div>
  );
}`}</CodeBlock>

              <h3>2. Pagination with State</h3>

              <CodeBlock language="typescript">{`// URL: /posts?page=3&per_page=20&sort=date&order=desc
export default function PostsPage({ query }) {
  const page = parseInt(query.page || '1');
  const perPage = parseInt(query.per_page || '10');
  const sort = query.sort || 'date';
  const order = query.order || 'desc';

  const buildPageUrl = (newPage: number) => {
    const params = new URLSearchParams(query);
    params.set('page', newPage.toString());
    return \`/posts?\${params.toString()}\`;
  };

  return (
    <div>
      <h1>Posts</h1>
      <p>Page {page}, {perPage} per page, sorted by {sort} ({order})</p>
      
      <nav className="pagination">
        {page > 1 && (
          <a href={buildPageUrl(page - 1)}>Previous</a>
        )}
        <a href={buildPageUrl(page + 1)}>Next</a>
      </nav>
    </div>
  );
}`}</CodeBlock>

              <h3>3. Modal/Dialog State</h3>

              <CodeBlock language="typescript">{`// URL: /dashboard?modal=settings&tab=profile
export default function DashboardPage({ query }) {
  const showModal = query.modal;
  const activeTab = query.tab;

  return (
    <div>
      <h1>Dashboard</h1>
      
      <button>
        <a href="/dashboard?modal=settings">Open Settings</a>
      </button>
      
      {showModal === 'settings' && (
        <div className="modal">
          <div className="modal-content">
            <h2>Settings</h2>
            
            <nav className="tabs">
              <a 
                href="/dashboard?modal=settings&tab=profile"
                className={activeTab === 'profile' ? 'active' : ''}
              >
                Profile
              </a>
              <a 
                href="/dashboard?modal=settings&tab=security"
                className={activeTab === 'security' ? 'active' : ''}
              >
                Security
              </a>
            </nav>
            
            <a href="/dashboard">Close</a>
          </div>
        </div>
      )}
    </div>
  );
}`}</CodeBlock>

              <h3>4. Form State Preservation</h3>

              <CodeBlock language="typescript">{`// URL: /contact?name=John&email=john@example.com&subject=Support
export default function ContactPage({ query }) {
  return (
    <div>
      <h1>Contact Us</h1>
      
      <form method="get">
        <input 
          type="text" 
          name="name" 
          defaultValue={query.name || ''} 
          placeholder="Your name" 
        />
        <input 
          type="email" 
          name="email" 
          defaultValue={query.email || ''} 
          placeholder="Your email" 
        />
        <select name="subject" defaultValue={query.subject || ''}>
          <option value="">Select subject</option>
          <option value="support">Support</option>
          <option value="sales">Sales</option>
          <option value="general">General</option>
        </select>
        <button type="submit">Update Form</button>
      </form>
      
      {(query.name || query.email || query.subject) && (
        <div className="form-preview">
          <h3>Form Preview:</h3>
          <p>Name: {query.name}</p>
          <p>Email: {query.email}</p>
          <p>Subject: {query.subject}</p>
        </div>
      )}
    </div>
  );
}`}</CodeBlock>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
