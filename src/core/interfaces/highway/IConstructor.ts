/**
 * TypeScript Constructor Interfaces Proposal
 *
 * Author: Reed Spool
 */

/**
 * Root interface for Constructor Interfaces. This is a workaround for
 * TypeScript's lack of "static" methods for controllers.
 *
 * Based on StackOverflow user chris's solution. See
 * https://stackoverflow.com/a/43484801/1037165
 *
 * @interface IConstructor
 * @template InstanceInterface
 */
type IConstructor<InstanceInterface> = new (...args : any[])  => InstanceInterface;
