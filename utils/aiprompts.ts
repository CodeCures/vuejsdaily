import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type { LevelKey } from "~/types";

const excludeUnwantedValues: string = `do not add any additional text before or after the object. return the object as it is. do not add any markdown sytanx highlighting like ${'```json'}, ${'```js'}, ${'```javascript'} and do not assign the response to a variable`;

export function generateCourseContentPrompt(technology: string, level: string) {
    return [
        { role: "system", content: `Generate a ${level}-friendly course name for learning ${technology}. Return the response in JSON format with the structure: { name: 'courseName', meta_description: 'meta_description', meta_keywords: 'meta_keywords', description: 'description', modules: [ { name: 'moduleName', description: 'moduleDescription', lessons: [ {name: 'lessonName', content: null} ] } ] } the value of lesson content should strictly null` },
        { role: "user", content: `Generate a ${level}-friendly course name for learning ${technology}. The course should appeal to individuals with basic knowledge of web development and aim to teach them fundamental ${technology} concepts in an accessible way.` },
        { role: "system", content: `Create a structured outline for a ${level}-friendly ${technology} course.` },
        { role: "user", content: `Create a structured outline for a ${level}-friendly ${technology} course. The course should be divided into modules, each covering essential concepts and techniques in ${technology}. Focus on providing clear explanations and practical examples to help learners grasp the material effectively.` },
        { role: "system", content: `Develop lessons for each module of a ${level}-friendly ${technology} course.` },
        { role: "user", content: `Develop lessons for each module of a ${level}-friendly ${technology} course. Each lesson should cover a specific topic within ${technology}, starting from the basics and gradually progressing to more advanced concepts. Ensure that the content is easy to understand for individuals with basic web development knowledge and includes hands-on exercises or projects to reinforce learning.` }
    ] as ChatCompletionMessageParam[];
}


export function generateCourseNamePrompt(tag: string, level: LevelKey): string {

    const levelPrompt = {
        Beginner: `someone who has does not know anything about ${tag} and just heard about it for the first time`,
        Intermediate: `someone who has does has basic knowledge of ${tag} and and wants to his/her knowlege of ${tag} to intermediate level`,
        Advanced: `someone whe has intermeidate knowledge of ${tag} and now wants to upgrade to advanced knowledge of ${tag}`
    }

    return `I want you to be my course creator. Using the official documentation for ${tag}, as a course creator you have ${levelPrompt[level]}. I want you to create a course name, and modules that will properly explain the ${level} of ${tag} to this learner in such a way that after going through the course, the learner will have the all ${level} knowledge of ${tag}. the course should be modularized but don't add the course lesson names yet. just the course name, description, meta description, meta keywords array and modules array. the modules should array of string containing only the names of the modules. your response should strictly be a javascript object containing (name, description, meta_description, modules). ${excludeUnwantedValues}`
}

export function reqenerateContent(currentValue: string): string {
    return `rewrite ${currentValue} and make it more professional and marketable. return the response as a javascript object with content key, where the content key contains the newly generated value. e.g {content: newValue}. ${excludeUnwantedValues}`
}

export function regenerateMetaKeywords<T>(currentValue: Array<T>): string {
    return `regenerate this meta keywords (${currentValue.join(',')}) and make it more SEO friendly. return the response as a javascript object with content key, where the content key contains the newly generated array value. e.g {content: newArrayValue[]}. ${excludeUnwantedValues}`
}

export function reqenerateContentArray<T>(currentValue: Array<T>): string {
    return `rewrite ${currentValue.join(',')} and make it more learner friendly and marketable. return the response as a javascript object with content key, where the content key contains the newly generated array value. e.g {content: newArrayValue[]}. ${excludeUnwantedValues}`
}

export function moduleContentPrompt(index: number, moduleName: string, courseName: string): string {
    const tailoredTo = index === 0 ? ' tailored towards Introduction' : '';
    return `${moduleName} is a module in ${courseName}. generate module content${tailoredTo} that contains description, meta_description, lessons array keys. the generate content must be a javascript object with the following structure {description: string, meta_description: string, lessons: string[]}. ${excludeUnwantedValues}`
}

export function generateLessonContentPrompt(courseName: string, lessonName: string): ChatCompletionMessageParam[] {
    return [{
        role: "system",
        content: `
        Write an engaging and interactive lesson titled "${lessonName}" for the course "${courseName}". The lesson should provide a captivating introduction to ${lessonName}, capturing the reader's interest from the beginning.
        - Start with a compelling opening that highlights the importance and relevance of ${lessonName} in ${courseName} development.
        - Introduce ${lessonName} in a way that is accessible to beginners, explaining its key features and advantages over other frameworks.
        - Use storytelling techniques or real-world examples to illustrate how ${lessonName} can solve common challenges faced by developers working with ${courseName}.
        - Incorporate interactive elements such as code snippets, demos, or interactive exercises to keep the reader engaged and encourage hands-on learning. Ensure that all code examples are written in Vue 3 script setup style.
        - Break down complex concepts into digestible chunks, using clear explanations and visual aids to enhance understanding.
        - Provide opportunities for readers to apply what they've learned through practical exercises or projects related to ${lessonName} in the context of ${courseName}.
        - Conclude the lesson with a summary of key points and a teaser for what they'll learn in the next lesson of ${courseName}.
        - Generate the content in the style of an engaging article or blog post, with storytelling elements, engaging visuals, and a conversational tone to keep the reader interested.
        Return the response in Markdown format, ensuring proper formatting for headings, lists, code blocks, and other elements to enhance readability.
`
    }] as ChatCompletionMessageParam[];
}

