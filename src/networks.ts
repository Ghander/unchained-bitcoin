import {networks} from "bitcoinjs-lib";

/**
 * This module exports network constants and provide some utility
 * functions for displaying the network name and passing the network
 * value to bitcoinjs.
 * 
 * @module networks
 */

/**
 * Enumeration of possible values for bitcoin networks ([MAINET]{@link module:networks.MAINNET}|[TESTNET]{@link module:networks.TESTNET}).
 *
 * @constant
 * @enum {string}
 * @default
 */

export enum NETWORKS {
  //corresponding to the Bitcoin mainnet.
  MAINNET = 'mainnet',
  //corresponding to the current Bitcoin testnet.
  TESTNET = 'testnet',
};

/**
 * Returns bitcoinjs-lib network object corresponding to the given
 * network.
 *
 * This function is for internal use by this library.
 * 
 * @param {module:networks.NETWORKS} network - bitcoin network
 * @returns {Network} bitcoinjs-lib network object
 */
export function networkData(network: NETWORKS) {
  switch (network) {
    case NETWORKS.MAINNET:
      return networks.bitcoin;
    case NETWORKS.TESTNET:
      return networks.testnet;
    default:
      return networks.testnet;
  }
}

/**
 * Returns human-readable network label for the specified network.
 * 
 * @param {module:networks.NETWORKS} network - bitcoin network
 * @returns {string} network label
 * @example
 * import {MAINNET} from "unchained-bitcoin";
 * console.log(networkLabel(MAINNET)); // "Mainnet"
 */
export function networkLabel(network: NETWORKS) : string {
  switch (network) {
    case NETWORKS.MAINNET:
      return "Mainnet";
    case NETWORKS.TESTNET:
      return "Testnet";
    default:
      return "Testnet";
  }
}

/**
 * @description given a prefix determine the network it indicates
 * @param {string} prefix - extended public key prefix (e.g. xpub, tpub)
 * @returns {string} - string indicating network
 */
export function getNetworkFromPrefix(prefix: string) : NETWORKS {
  switch (prefix.toLowerCase()) {
    case 'xpub':
    case 'ypub':
    case 'zpub':
      return NETWORKS.MAINNET;

    case 'tpub':
    case 'upub':
    case 'vpub':
      return NETWORKS.TESTNET;

    default:
      throw new Error(`Unrecognized extended public key prefix ${prefix}`)
  }
}
