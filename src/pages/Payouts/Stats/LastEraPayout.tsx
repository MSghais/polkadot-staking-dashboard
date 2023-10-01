// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { planckToUnit } from '@polkadot-cloud/utils';
import { useTranslation } from 'react-i18next';
import { useStaking } from 'contexts/Staking';
import { Number } from 'library/StatBoxList/Number';
import { useNetwork } from 'contexts/Network';

export const LastEraPayoutStat = () => {
  const { t } = useTranslation('pages');
  const { unit, units } = useNetwork().networkData;
  const { staking } = useStaking();
  const { lastReward } = staking;

  const lastRewardUnit = planckToUnit(lastReward, units).toNumber();

  const params = {
    label: t('payouts.lastEraPayout'),
    value: lastRewardUnit,
    decimals: 3,
    unit,
    helpKey: 'Last Era Payout',
  };
  return <Number {...params} />;
};
