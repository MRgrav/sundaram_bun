import { FC } from 'hono/jsx';

interface RichTextDisplayProps {
    htmlContent?: string; // Changed to optional to accept string or undefined
    className?: string; // Optional for applying Tailwind classes
}

/**
 * Renders raw HTML content, such as output from a PocketBase rich text field.
 * WARNING: Only use this for content you trust, like data stored in your CMS.
 */
export const RichTextDisplay: FC<RichTextDisplayProps> = ({ htmlContent, className }) => {
    // Use nullish coalescing to ensure that if htmlContent is null or undefined, 
    // we pass an empty string to __html, satisfying TypeScript.
    const safeHtmlContent = htmlContent ?? '';
    
    // 1. We wrap the content in a simple div or section tag.
    // 2. We use the dangerouslySetInnerHTML prop.
    // 3. The value MUST be an object: { __html: htmlContent }
    return (
        <div 
            className={className}
            dangerouslySetInnerHTML={{ __html: safeHtmlContent }} 
        />
    );
};
