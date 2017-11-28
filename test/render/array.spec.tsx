import store from 'store';
import Plusnew from 'index';
import component from 'interfaces/component';

describe('rendering nested components', () => {
  let plusnew: Plusnew;
  let container: HTMLElement;
 

  beforeEach(() => {
    plusnew = new Plusnew();

    container = document.createElement('div');
    container.innerHTML = 'lots of stuff';
    document.body.appendChild(container);
  });

  it('does a initial list work?', () => {
    const list = ['first', 'second', 'third'];
    const local = new store(() => {
      return list;
    }).dispatch('init');

    const MainComponent: component<{}> = () => {
      return {
        render: () => <ul>{local.state.map((value, index) => <li key={index}>{value}</li>)}</ul>,
        dependencies: {},
      };
    };

    plusnew.render(MainComponent, container);

    const ul = container.childNodes[0] as HTMLElement;
    expect(container.childNodes.length).toBe(1);
    expect(ul.tagName).toBe('UL');
    expect(ul.childNodes.length).toBe(3);
    ul.childNodes.forEach((li: Node, index) => {
      expect((li as HTMLElement).tagName).toBe('LI');
      expect((li as HTMLElement).innerHTML).toBe(list[index]);
    });
  });
});