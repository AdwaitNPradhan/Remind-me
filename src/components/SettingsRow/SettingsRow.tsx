import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import Typography from '../Typography/Typography';
import Switch from '../Switch/Switch';
import CustomTextInput from '../CustomTextInput/CustomTextInput';

interface SettingsRowProps {
  title: string;
  description?: string;
  value: boolean | string | number | undefined;
  onChange: (value?: boolean | string | number | undefined) => void;
  type: 'toggle' | 'input-number';
}

const SettingsRow = ({
  title,
  description,
  value,
  onChange,
  type,
}: SettingsRowProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
      }}>
      <View style={{ maxWidth: '67%' }}>
        <Typography
          textStyles={{
            color: colors.white,
            fontFamily: fonts.montserrat.semiBold,
            fontSize: 16,
          }}>
          {title}
        </Typography>
        {!!description && (
          <Typography
            textStyles={{
              color: colors.white,
              fontFamily: fonts.montserrat.semiBold,
              fontSize: 12,
            }}>
            {description}
          </Typography>
        )}
      </View>
      <View>
        {type === 'toggle' && typeof value === 'boolean' && (
          <Switch
            value={value}
            onChange={onChange}
            offColor={colors.red}
            onColor={colors.green}
          />
        )}
        {type === 'input-number' && (
          <CustomTextInput
            keyboardType={'number-pad'}
            value={value?.toString() ?? ''}
            onChangeText={onChange}
            style={{
              width: 100,
              height: 40,
              color: colors.gray,
              fontSize: 16,
              textAlign: 'right',
              fontFamily: fonts.montserrat.semiBold,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SettingsRow;

const styles = StyleSheet.create({});
