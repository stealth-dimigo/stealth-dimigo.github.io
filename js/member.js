function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
{/* <i class="`fa-brands fa-instagram`"></i>
<i class="fa-brands fa-facebook"></i>
<i class="fa-brands fa-github"></i>
<i class="fa-brands fa-steam"></i>
<i class="fa-regular fa-envelope"></i>
<i class="fa-brands fa-discord"></i> */}

const SNS = {
    'instagram': {
        icon: 'fa-brands fa-instagram',
        link: 'https://www.instagram.com/{}/'
    },
    'facebook': {
        icon: 'fa-brands fa-facebook',
        link: 'https://www.facebook.com/{}/'
    },
    'github': {
        icon: 'fa-brands fa-github',
        link: 'https://github.com/{}'
    },
    'email': {
        icon: 'fa-regular fa-envelope',
        link: 'mailto:{}'
    },
    'discord': {
        icon: 'fa-brands fa-discord',
        link: '{}'
    },
    'steam': {
        icon: 'fa-brands fa-steam',
        link: '{}'
    },
    'other': {
        icon: 'fa-solid fa-link'
    }
}

function snsElement(type, val) {
    let link, icon;
    if (type in SNS) {
        link = SNS[type].link.replace('{}', val);
        icon = SNS[type].icon;
    } else {
        link = val;
        icon = SNS.other.icon;
    }
    return `<div class="member-social">
    <a href="${link}"><i class="${icon}"></i></a>
</div>`
}

class MemberCard extends HTMLElement {

    connectedCallback() {
        let snsList = [];
        let name = this.getAttribute('name') ?? '김테스트';
        let nickname = this.getAttribute('nickname') ?? 'test1234';
        let img = this.getAttribute('img') ?? 'default.svg';
        let category = this.getAttribute('category') ?? 'misc';
        let link = this.getAttribute('link') ?? 'about:blank';

        this.getAttributeNames().forEach((name) => {
            if (!name.startsWith('sns')) return;
            snsList.push(snsElement(name.split('-')[1], this.getAttribute(name)));
        })

        img = img.startsWith('http') ? img : `./images/profiles/${img}`;;
        category = category.split(',').map(val => `<li>${capitalize(val)}</li>`).join('\n');
        this.innerHTML = `<div class="member-card">
<div class="member-img-box">
    <div class="member-link">
        <a href="${link}" target="_blank">
            <p class="">
                Visit profile &#x2192;
            </p>
        </a>
    </div>
    <img class="member-img" src="${img}" alt="">
</div>
<div class="member-info">
    <p class="member-name">
        ${name}
    </p>
    <p class="member-nickname">
        ${nickname}
    </p>
    <ul class="member-category">
        ${category}
    </ul>
</div>
<div class="member-contact">
${snsList.join('')}
${snsList.length == 0 ? "<span>&nbsp;</span>" : ""}
</div>
</div>`;
    }
}

customElements.define("member-card", MemberCard);
