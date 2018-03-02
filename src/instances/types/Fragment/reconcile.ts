import FragmentInstance from './Instance';
import PlusnewAbstractElement from '../../../PlusnewAbstractElement';
import reconciler from '../../reconciler';
import factory from '../../factory';

export default function (newAbstractElement: PlusnewAbstractElement, instance: FragmentInstance) {
  for (let i = 0; i < newAbstractElement.props.children.length; i += 1) {
    if (i < instance.children.length) {
      const newInstance = reconciler.update(newAbstractElement.props.children[i], instance.children[i]);
      if (newInstance !== instance.children[i]) {
        instance.children[i].remove();
        instance.children[i] = newInstance;
      }
    } else {
      instance.children.push(
        factory(newAbstractElement.props.children[i], instance, instance.getPreviousLength.bind(instance, i)),
      );
    }
  }

  for (let i = newAbstractElement.props.children.length; i < instance.abstractElement.props.children.length; i += 1) {
    instance.children[i].remove();
  }

  instance.abstractElement = newAbstractElement; // updating the shadowdom
}
