/* ============================================
   BLOG JAVASCRIPT - Blog Posts Management
   ============================================ */

// Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: "Microservices Architecture: Best Practices",
        date: "Dec 15, 2024",
        author: "Karthik K",
        category: ".NET Core",
        readTime: "8 min read",
        excerpt: "Explore best practices for designing and implementing microservices architecture, including communication patterns, data consistency, and deployment strategies.",
        content: `
            <h2>Microservices Architecture: Best Practices</h2>
            <p>Microservices architecture has become increasingly popular over the past few years. It offers numerous advantages including scalability, flexibility, and independent deployment. However, implementing microservices correctly requires careful planning and adherence to best practices.</p>

            <h3>What are Microservices?</h3>
            <p>Microservices are an architectural approach to building applications as a collection of small, independent services that communicate over well-defined APIs. Each service is responsible for a specific business capability and can be developed, deployed, and scaled independently.</p>

            <h3>Key Benefits</h3>
            <ul>
                <li><strong>Scalability:</strong> Scale individual services based on demand</li>
                <li><strong>Flexibility:</strong> Use different technologies for different services</li>
                <li><strong>Resilience:</strong> Failure in one service doesn't bring down the entire system</li>
                <li><strong>Faster Deployment:</strong> Deploy services independently</li>
                <li><strong>Team Autonomy:</strong> Different teams can work on different services</li>
            </ul>

            <h3>Best Practices for Microservices Architecture</h3>

            <h4>1. Domain-Driven Design (DDD)</h4>
            <p>Use Domain-Driven Design principles to identify service boundaries. Each microservice should represent a specific business domain or subdomain. This ensures that services are cohesive and loosely coupled.</p>

            <h4>2. API Design</h4>
            <p>Design clear, consistent APIs following RESTful principles or using GraphQL. Document your APIs thoroughly using Swagger/OpenAPI. Implement proper versioning strategies to maintain backward compatibility.</p>

            <h4>3. Data Management</h4>
            <p>Follow the database-per-service pattern to ensure loose coupling. However, this introduces the challenge of maintaining data consistency across services. Consider using event-driven architecture or the Saga pattern for distributed transactions.</p>

            <h4>4. Communication Patterns</h4>
            <p>Choose appropriate communication patterns:</p>
            <ul>
                <li><strong>Synchronous:</strong> REST APIs, gRPC for direct service-to-service communication</li>
                <li><strong>Asynchronous:</strong> Message queues, event buses for decoupled communication</li>
            </ul>

            <h4>5. Resilience and Fault Tolerance</h4>
            <p>Implement resilience patterns such as circuit breakers, retry logic, and timeouts. Use tools like Polly in .NET to implement these patterns easily. Monitor service health and implement health checks.</p>

            <h4>6. Observability</h4>
            <p>Implement comprehensive logging, tracing, and monitoring. Distributed tracing tools like Jaeger or Zipkin help track requests across multiple services. Centralized logging using ELK stack or Application Insights is essential.</p>

            <h4>7. Container and Orchestration</h4>
            <p>Use Docker for containerization and Kubernetes for orchestration. This ensures consistent deployment across environments and simplifies scaling.</p>

            <h3>Challenges and Solutions</h3>
            <p>While microservices offer many benefits, they also introduce complexity. Key challenges include:</p>
            <ul>
                <li>Distributed system complexity</li>
                <li>Data consistency and transactions</li>
                <li>Service discovery and routing</li>
                <li>Testing and debugging</li>
                <li>Operational overhead</li>
            </ul>

            <p>Address these challenges through careful planning, appropriate tooling, and best practices as mentioned above.</p>

            <h3>Conclusion</h3>
            <p>Microservices architecture can bring significant benefits to your organization, but it requires thoughtful implementation. Follow these best practices, invest in proper tooling and infrastructure, and ensure your team has the necessary skills to manage the increased complexity. Start small, learn from experience, and scale gradually.</p>
        `
    },
    {
        id: 2,
        title: "Performance Optimization in .NET Core",
        date: "Dec 8, 2024",
        author: "Karthik K",
        category: ".NET Core",
        readTime: "10 min read",
        excerpt: "Learn practical techniques for optimizing .NET Core applications, including caching strategies, async/await patterns, and database query optimization.",
        content: `
            <h2>Performance Optimization in .NET Core</h2>
            <p>Performance is critical for application success. Users expect fast, responsive applications. In this article, I'll share practical techniques for optimizing .NET Core applications to ensure they run efficiently and handle load effectively.</p>

            <h3>Understanding Performance Bottlenecks</h3>
            <p>Before optimizing, identify bottlenecks using profiling tools like dotTrace, Application Insights, or built-in diagnostic tools. Common bottlenecks include:</p>
            <ul>
                <li>Database queries</li>
                <li>I/O operations</li>
                <li>CPU-intensive computations</li>
                <li>Memory allocation patterns</li>
            </ul>

            <h3>1. Caching Strategies</h3>

            <h4>In-Memory Caching</h4>
            <p>Use <code>IMemoryCache</code> for caching frequently accessed data:</p>
            <pre><code>
public class ProductService
{
    private readonly IMemoryCache _cache;

    public ProductService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public Product GetProduct(int id)
    {
        if (!_cache.TryGetValue($"product_{id}", out Product product))
        {
            product = _repository.GetProduct(id);
            _cache.Set($"product_{id}", product, 
                new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromHours(1)));
        }
        return product;
    }
}
            </code></pre>

            <h4>Distributed Caching</h4>
            <p>For multi-instance deployments, use distributed caches like Redis:</p>
            <pre><code>
public class CachedProductService
{
    private readonly IDistributedCache _cache;

    public async Task<Product> GetProductAsync(int id)
    {
        var cacheKey = $"product_{id}";
        var cached = await _cache.GetStringAsync(cacheKey);

        if (cached != null)
            return JsonSerializer.Deserialize<Product>(cached);

        var product = await _repository.GetProductAsync(id);
        await _cache.SetStringAsync(cacheKey, 
            JsonSerializer.Serialize(product),
            new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromHours(1)));

        return product;
    }
}
            </code></pre>

            <h3>2. Async/Await Patterns</h3>
            <p>Use async/await properly to prevent blocking threads:</p>
            <pre><code>
// Good - Non-blocking
public async Task<IActionResult> GetProductsAsync()
{
    var products = await _service.GetProductsAsync();
    return Ok(products);
}

// Bad - Blocking
public IActionResult GetProducts()
{
    var products = _service.GetProductsAsync().Result; // Blocks!
    return Ok(products);
}
            </code></pre>

            <h3>3. Database Query Optimization</h3>

            <h4>Use Projections</h4>
            <p>Select only required columns instead of full entities:</p>
            <pre><code>
// Good - Selects only required columns
var products = await _context.Products
    .Select(p => new ProductDto { Id = p.Id, Name = p.Name })
    .ToListAsync();

// Bad - Selects all columns
var products = await _context.Products.ToListAsync();
            </code></pre>

            <h4>Eager Loading</h4>
            <p>Use <code>.Include()</code> to avoid N+1 queries:</p>
            <pre><code>
// Good - Single query with join
var orders = await _context.Orders
    .Include(o => o.Customer)
    .Include(o => o.Items)
    .ToListAsync();

// Bad - N+1 queries
var orders = await _context.Orders.ToListAsync();
foreach (var order in orders)
{
    var customer = await _context.Customers.FindAsync(order.CustomerId);
}
            </code></pre>

            <h3>4. Memory Management</h3>
            <p>Be mindful of memory allocations:</p>
            <ul>
                <li>Use structs for small, frequently allocated types</li>
                <li>Use object pooling for high-frequency allocations</li>
                <li>Dispose of disposable objects properly</li>
                <li>Avoid boxing when possible</li>
            </ul>

            <h3>5. Monitoring and Profiling</h3>
            <p>Implement Application Insights for production monitoring:</p>
            <pre><code>
services.AddApplicationInsightsTelemetry();
services.AddApplicationInsightsKubernetesEnricher();
            </code></pre>

            <h3>Conclusion</h3>
            <p>Performance optimization is an ongoing process. Measure, identify bottlenecks, implement fixes, and measure again. Use the techniques outlined here as a starting point, but always profile your specific application to identify where to focus your optimization efforts.</p>
        `
    },
    {
        id: 3,
        title: "Angular Component Communication Patterns",
        date: "Dec 1, 2024",
        author: "Karthik K",
        category: "Angular",
        readTime: "7 min read",
        excerpt: "Deep dive into various Angular component communication patterns including @Input/@Output, Subject/BehaviorSubject, and service-based communication.",
        content: `
            <h2>Angular Component Communication Patterns</h2>
            <p>One of the core challenges in Angular development is managing communication between components. As applications grow, establishing clear communication patterns becomes crucial for maintainability and testability. In this article, I'll explore the most common patterns.</p>

            <h3>1. Parent to Child: @Input</h3>
            <p>The simplest communication pattern is passing data from parent to child using @Input:</p>
            <pre><code>
// Parent Component
@Component({
  selector: 'app-parent',
  template: '<app-child [message]="parentMessage"></app-child>'
})
export class ParentComponent {
  parentMessage = 'Hello from Parent';
}

// Child Component
@Component({
  selector: 'app-child',
  template: '{{ message }}'
})
export class ChildComponent {
  @Input() message: string;
}
            </code></pre>

            <h3>2. Child to Parent: @Output and EventEmitter</h3>
            <p>Use @Output and EventEmitter to send data from child to parent:</p>
            <pre><code>
// Parent Component
@Component({
  selector: 'app-parent',
  template: '<app-child (messageEvent)="receiveMessage($event)"></app-child>'
})
export class ParentComponent {
  receivedMessage: string;

  receiveMessage(event: string) {
    this.receivedMessage = event;
  }
}

// Child Component
@Component({
  selector: 'app-child',
  template: '<button (click)="sendMessage()">Send</button>'
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Hello from Child');
  }
}
            </code></pre>

            <h3>3. Sibling Communication: Service with Subject</h3>
            <p>For sibling components, use a shared service with Subject:</p>
            <pre><code>
// Shared Service
@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();

  sendMessage(msg: string) {
    this.messageSubject.next(msg);
  }
}

// Sibling A (Sender)
@Component({...})
export class SiblingAComponent {
  constructor(private messageService: MessageService) {}

  send() {
    this.messageService.sendMessage('Hello Sibling B');
  }
}

// Sibling B (Receiver)
@Component({
  template: '{{ message$ | async }}'
})
export class SiblingBComponent {
  message$ = this.messageService.message$;

  constructor(private messageService: MessageService) {}
}
            </code></pre>

            <h3>4. Stateful Communication: BehaviorSubject</h3>
            <p>Use BehaviorSubject when you need the current value:</p>
            <pre><code>
@Injectable({ providedIn: 'root' })
export class StateService {
  private state = new BehaviorSubject<AppState>({
    user: null,
    isLoading: false
  });

  state$ = this.state.asObservable();

  setState(newState: Partial<AppState>) {
    this.state.next({
      ...this.state.value,
      ...newState
    });
  }
}

// Component can get current state
export class MyComponent {
  currentState = this.stateService.state.value;
}
            </code></pre>

            <h3>5. Two-Way Binding: ngModel</h3>
            <p>For simple form inputs, use two-way binding:</p>
            <pre><code>
@Component({
  selector: 'app-form',
  template: '<input [(ngModel)]="userName">'
})
export class FormComponent {
  userName: string;
}
            </code></pre>

            <h3>Best Practices</h3>
            <ul>
                <li>Use @Input/@Output for parent-child communication</li>
                <li>Use Services with RxJS Observables for global state</li>
                <li>Keep component logic focused and isolated</li>
                <li>Use async pipe for automatic subscription management</li>
                <li>Implement OnDestroy to unsubscribe from observables</li>
            </ul>

            <h3>Conclusion</h3>
            <p>Choosing the right communication pattern depends on your component hierarchy and data flow requirements. Start with simple patterns like @Input/@Output, and progress to more complex patterns like services and state management as your application grows.</p>
        `
    }
];

// Render Blog Content
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    const blogContent = document.getElementById('blog-content');

    if (blogId) {
        // Single blog post view
        const post = blogPosts.find(p => p.id === parseInt(blogId));
        if (post) {
            renderBlogPost(post, blogContent);
        } else {
            blogContent.innerHTML = '<p class="error">Blog post not found.</p>';
        }
    } else {
        // Blog listing view
        renderBlogListing(blogContent);
    }
});

function renderBlogPost(post, container) {
    container.innerHTML = `
        <article class="blog-post">
            <div class="post-header">
                <h1>${post.title}</h1>
                <div class="post-meta">
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                    <span><i class="fas fa-folder"></i> ${post.category}</span>
                    <span><i class="fas fa-clock"></i> ${post.readTime}</span>
                </div>
            </div>
            <div class="post-content">
                ${post.content}
            </div>
            <div class="post-footer">
                <a href="blog.html" class="btn btn-secondary">← Back to Blog</a>
            </div>
        </article>
    `;

    // Add styling for blog post
    addBlogPostStyles();
}

function renderBlogListing(container) {
    let html = '<div class="blog-listing">';

    blogPosts.forEach(post => {
        html += `
            <article class="blog-list-item">
                <h2><a href="blog.html?id=${post.id}">${post.title}</a></h2>
                <div class="post-meta">
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                    <span><i class="fas fa-folder"></i> ${post.category}</span>
                    <span><i class="fas fa-clock"></i> ${post.readTime}</span>
                </div>
                <p>${post.excerpt}</p>
                <a href="blog.html?id=${post.id}" class="read-more">Read More →</a>
            </article>
        `;
    });

    html += '</div>';
    container.innerHTML = html;

    // Add styling for blog listing
    addBlogListingStyles();
}

function addBlogPostStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .blog-post {
            max-width: 800px;
            margin: 0 auto;
        }

        .post-header {
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 2px solid var(--border-color);
        }

        .post-header h1 {
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        .post-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .post-meta i {
            color: var(--primary-color);
            margin-right: 0.5rem;
        }

        .post-content {
            line-height: 1.8;
            margin-bottom: 3rem;
        }

        .post-content h2 {
            color: var(--primary-color);
            margin-top: 2rem;
            margin-bottom: 1rem;
        }

        .post-content h3 {
            color: var(--accent-color);
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
        }

        .post-content h4 {
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }

        .post-content ul,
        .post-content ol {
            margin-left: 2rem;
            margin-bottom: 1rem;
        }

        .post-content li {
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
        }

        .post-content code {
            background-color: rgba(30, 41, 59, 0.8);
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            color: var(--accent-color);
            font-family: 'Courier New', monospace;
        }

        .post-content pre {
            background-color: rgba(30, 41, 59, 0.9);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 1.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
        }

        .post-content pre code {
            background: none;
            padding: 0;
            color: var(--text-primary);
        }

        .post-footer {
            padding-top: 2rem;
            border-top: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
            .post-meta {
                flex-direction: column;
                gap: 0.5rem;
            }
        }
    `;
    document.head.appendChild(style);
}

function addBlogListingStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .blog-listing {
            max-width: 900px;
            margin: 0 auto;
            display: grid;
            gap: 3rem;
        }

        .blog-list-item {
            padding: 2rem;
            background-color: rgba(30, 41, 59, 0.5);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            transition: var(--transition);
        }

        .blog-list-item:hover {
            background-color: rgba(30, 41, 59, 0.8);
            border-color: var(--primary-color);
            transform: translateY(-5px);
        }

        .blog-list-item h2 {
            margin-bottom: 0.5rem;
        }

        .blog-list-item h2 a {
            color: var(--primary-color);
        }

        .blog-list-item .post-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }

        .blog-list-item p {
            margin-bottom: 1rem;
        }
    `;
    document.head.appendChild(style);
}
