import { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import CommonSidebar from '../../common/CommonSidebar';
import { BlogDataContext } from '../../contextApi/BlogDataContextValue';
import { blogService } from '../../services/blogService';
import LazyImage from '../../common/LazyImage';
import { getAuthor } from '../../data/authors';
import './BlogDetails.scss';

/**
 * Check if content contains HTML tags
 */
const isHTMLContent = (content) => {
    if (!content) return false;
    // Check for common HTML tags
    const htmlPattern = /<(p|div|h[1-6]|ul|ol|li|br|strong|em|a|img|table|blockquote)[^>]*>/i;
    return htmlPattern.test(content);
};

/**
 * Convert plain text content to HTML
 * Handles newlines, bullet points, numbered lists, and horizontal rules
 */
const convertPlainTextToHTML = (text) => {
    if (!text) return '';

    // Replace horizontal lines (underscores) with marker
    let content = text.replace(/_{5,}/g, '|||HR|||');

    // Split by newlines
    const lines = content.split('\n');
    const result = [];
    let currentBulletList = [];
    let currentNumberedList = [];

    const flushBulletList = () => {
        if (currentBulletList.length > 0) {
            result.push(`<ul class="blog-content-list">${currentBulletList.join('')}</ul>`);
            currentBulletList = [];
        }
    };

    const flushNumberedList = () => {
        if (currentNumberedList.length > 0) {
            result.push(`<ol class="blog-numbered-list">${currentNumberedList.join('')}</ol>`);
            currentNumberedList = [];
        }
    };

    const flushAllLists = () => {
        flushBulletList();
        flushNumberedList();
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines
        if (!line) {
            flushAllLists();
            continue;
        }

        // Check for horizontal rule marker
        if (line === '|||HR|||' || line.includes('|||HR|||')) {
            flushAllLists();
            result.push('<hr class="blog-divider">');
            continue;
        }

        // Check if line starts with bullet point (• or · followed by optional tab/spaces)
        const bulletMatch = line.match(/^[•·]\s*/);
        if (bulletMatch) {
            flushNumberedList();
            const itemText = line.slice(bulletMatch[0].length).trim();
            if (itemText) {
                currentBulletList.push(`<li>${itemText}</li>`);
            }
            continue;
        }

        // Check if line starts with numbered list (1. 2. etc)
        const numberedMatch = line.match(/^(\d+)\.\s+/);
        if (numberedMatch) {
            flushBulletList();
            const itemText = line.slice(numberedMatch[0].length).trim();
            if (itemText) {
                currentNumberedList.push(`<li>${itemText}</li>`);
            }
            continue;
        }

        // If we were in a list, flush it
        flushAllLists();

        // Check if line looks like a heading (short, ends with ? or specific patterns)
        const isHeading = (
            line.length < 100 &&
            !line.endsWith('.') &&
            !line.endsWith(',') &&
            (
                line.endsWith('?') ||
                /^(What|Why|How|When|Where|Who|Which|Expert|Comparison|Conclusion|Introduction|FAQ|Tips|Summary|Key|Important|Understanding)/i.test(line)
            )
        );

        // Also check for standalone section titles (short lines that look like headers)
        const isSectionTitle = (
            line.length < 60 &&
            !line.endsWith('.') &&
            !line.endsWith(',') &&
            !line.includes(':') &&
            /^[A-Z]/.test(line) &&
            !/[a-z]{20,}/.test(line) // Not a long lowercase word run
        );

        if (isHeading || isSectionTitle) {
            result.push(`<h3 class="blog-heading">${line}</h3>`);
        } else {
            // Regular paragraph
            result.push(`<p>${line}</p>`);
        }
    }

    // Flush any remaining list items
    flushAllLists();

    return result.join('\n');
};

const BlogDetailsSection = () => {
    const { blogData } = useContext(BlogDataContext);
    const { title: slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch post by slug
    const fetchPost = useCallback(async () => {
        if (!slug) return;

        try {
            setLoading(true);
            setError(null);
            const data = await blogService.getPostByIdentifier(slug);
            setPost(data);
        } catch (err) {
            setError(err?.response?.data?.detail || err?.message || 'Failed to load post');
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        // If we have context data with full content, use it
        if (blogData?.content || blogData?.desc) {
            setPost({
                title: blogData.title,
                cover_image_url: blogData.thumb || blogData.cover_image_url,
                author_name: blogData.admin?.replace(/^By\s+/, '') || blogData.author_name || 'Admin',
                content: blogData.content || blogData.desc,
                excerpt: blogData.excerpt || blogData.desc,
                published_at: blogData.published_at || blogData.created_at,
                categories: blogData.categories || [],
                tags: blogData.tags || [],
            });
            setLoading(false);
            return;
        }

        // Otherwise fetch from API
        fetchPost();
    }, [slug, blogData, fetchPost]);

    // Retry handler
    const handleRetry = () => {
        fetchPost();
    };

    // Process and sanitize content
    const processedContent = useMemo(() => {
        const rawContent = post?.content || post?.excerpt || '';

        // If content is already HTML, sanitize and return
        if (isHTMLContent(rawContent)) {
            return DOMPurify.sanitize(rawContent, {
                ALLOWED_TAGS: [
                    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'ul', 'ol', 'li',
                    'a', 'img',
                    'blockquote', 'pre', 'code',
                    'table', 'thead', 'tbody', 'tr', 'th', 'td',
                    'div', 'span', 'hr'
                ],
                ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel']
            });
        }

        // Convert plain text to HTML, then sanitize
        const htmlContent = convertPlainTextToHTML(rawContent);
        return DOMPurify.sanitize(htmlContent, {
            ALLOWED_TAGS: [
                'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'ul', 'ol', 'li',
                'a', 'img',
                'blockquote', 'pre', 'code',
                'table', 'thead', 'tbody', 'tr', 'th', 'td',
                'div', 'span', 'hr'
            ],
            ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel']
        });
    }, [post?.content, post?.excerpt]);

    // Format date
    const formattedDate = useMemo(() => {
        const date = post?.published_at || post?.created_at;
        if (!date) return new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
        return new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
    }, [post?.published_at, post?.created_at]);

    // Loading state
    if (loading) {
        return (
            <div className="blog-details-section padding-y-120">
                <div className="container container-two">
                    <div className="row gy-4">
                        <div className="col-lg-8">
                            <div className="text-center py-5">
                                <div className="spinner-border text-main" role="status" aria-live="polite">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading article...</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <CommonSidebar renderSearch={true} renderProperties={false} renderTags={true} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="blog-details-section padding-y-120">
                <div className="container container-two">
                    <div className="row gy-4">
                        <div className="col-lg-8">
                            <div className="text-center py-5">
                                <i className="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                                <h5>Failed to Load Article</h5>
                                <p className="text-muted mb-4">{error}</p>
                                <button className="btn btn-main" onClick={handleRetry}>
                                    <i className="fas fa-redo me-2"></i>
                                    Try Again
                                </button>
                                <Link to="/blog" className="btn btn-outline-secondary ms-2">
                                    Back to Blog
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <CommonSidebar renderSearch={true} renderProperties={false} renderTags={true} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Not found state
    if (!post) {
        return (
            <div className="blog-details-section padding-y-120">
                <div className="container container-two">
                    <div className="row gy-4">
                        <div className="col-lg-8">
                            <div className="text-center py-5">
                                <i className="fas fa-file-alt fa-3x text-muted mb-3"></i>
                                <h5>Article Not Found</h5>
                                <p className="text-muted mb-4">The article you are looking for does not exist.</p>
                                <Link to="/blog" className="btn btn-main">
                                    Back to Blog
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <CommonSidebar renderSearch={true} renderProperties={false} renderTags={true} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const thumb = post.thumbnail_url || post.cover_image_url;
    const title = post.title || 'Blog Details';
    const authorSlug = post.author_slug || '360ghar-team';
    const authorInfo = getAuthor(authorSlug);
    const authorName = post.author_name || authorInfo.name;
    const categories = post.categories || [];
    const tags = post.tags || [];

    return (
        <div className="blog-details-section padding-y-120">
            <div className="container container-two">
                <div className="row gy-4">
                    <div className="col-lg-8">
                        <article className="blog-details">
                            {/* Featured Image */}
                            {thumb && (
                                <div className="blog-details__thumb">
                                    <LazyImage src={thumb} alt={title} className="cover-img" priority />
                                    <span className="blog-details__date">{formattedDate}</span>
                                </div>
                            )}

                            <div className="blog-details__content">
                                {/* Meta Info */}
                                <ul className="blog-infos mb-3">
                                    <li className="blog-infos__item">
                                        <span className="icon"><i className="fas fa-user"></i></span>
                                        By <Link to={`/blog/author/${authorSlug}`}>{authorName}</Link>
                                    </li>
                                    <li className="blog-infos__item">
                                        <span className="icon"><i className="fas fa-calendar"></i></span>
                                        {formattedDate}
                                    </li>
                                </ul>

                                {/* Categories */}
                                {categories.length > 0 && (
                                    <div className="mb-3">
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.id || cat.slug}
                                                to={`/blog?category=${cat.slug}`}
                                                className="badge bg-main me-2 text-decoration-none"
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* Title - Using h2 for better sizing */}
                                <h2 className="blog-details__title">{title}</h2>

                                {/* Content - Rendered as sanitized HTML */}
                                <div
                                    className="blog-details__content-body"
                                    dangerouslySetInnerHTML={{ __html: processedContent }}
                                />

                                {/* Tags */}
                                {tags.length > 0 && (
                                    <div className="blog-details__tags mt-5 pt-4 border-top">
                                        <div className="d-flex align-items-center flex-wrap gap-2">
                                            <strong className="me-2">Tags:</strong>
                                            {tags.map((tag) => (
                                                <Link
                                                    key={tag.id || tag.slug}
                                                    to={`/blog?tag=${tag.slug}`}
                                                    className="badge bg-light text-dark text-decoration-none"
                                                >
                                                    #{tag.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Back to blog link */}
                                <div className="mt-5 pt-4 border-top">
                                    <Link to="/blog" className="btn btn-outline-main">
                                        <i className="fas fa-arrow-left me-2"></i>
                                        Back to Blog
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-lg-4">
                        <CommonSidebar renderSearch={true} renderProperties={false} renderTags={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailsSection;
