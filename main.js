import { el, setChildren } from 'redom';

function postPage(id) {
    const body = el('p', 'Loading...');

    fetch(`https://gorest.co.in/public/v2/posts/${id}`).then(async (res) => {
        const data = await res.json();

        setChildren(body, [
            el('h2', data.title),
            el('p', data.body),
            el('a', {
                href: '/',
                onclick(event) {
                    event.preventDefault();
                    setChildren(document.body, postListPage())
                },
            }, 'Вернуться к списку'),
        ]);
    });

    return el('div', { className: 'container'}, [
        el('h1', 'Post'),
        body,
    ]);
}

function postListPage() {
    const list = el('ul', el('li', 'Loading...'));

    fetch('htpps://gorest.co.in/public/v2/posts').then(async (res) => {
        const data = await res.json();

        setChildren(list, data.map(post => el(
            'li',
            el('a', {
                href: `/public/v2/posts/${post.id}`,
                onclick(event) {
                    event.preventDefault();
                    setChildren(document.body, postPage(post.id))
                }
            }, post.title)   
        )));
    });

    return el('div', { className: 'container' }, [
        el('h1', 'Post list'),
        list,
    ]);
}

setChildren(document.body, postListPage())