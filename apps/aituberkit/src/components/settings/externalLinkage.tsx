import { useTranslation } from 'react-i18next'
import settingsStore from '@/features/stores/settings'
import { TextButton } from '../textButton'
import { useCallback } from 'react'

const ExternalLinkage = () => {
  const { t } = useTranslation()
  const externalLinkageMode = settingsStore((s) => s.externalLinkageMode)
  const externalLinkageWebSocketUrl = settingsStore(
    (s) => s.externalLinkageWebSocketUrl
  )

  const handleExternalLinkageModeChange = useCallback((newMode: boolean) => {
    settingsStore.setState({
      externalLinkageMode: newMode,
    })

    if (newMode) {
      settingsStore.setState({
        conversationContinuityMode: false,
        realtimeAPIMode: false,
      })
    }
  }, [])

  return (
    <div className="mb-10">
      <div className="mb-4 text-xl font-bold">{t('ExternalLinkageMode')}</div>
      <div className="my-2">
        <TextButton
          onClick={() => {
            handleExternalLinkageModeChange(!externalLinkageMode)
          }}
        >
          {externalLinkageMode ? t('StatusOn') : t('StatusOff')}
        </TextButton>
      </div>
      {externalLinkageMode && (
        <>
          <div className="mt-6 font-bold">
            {t('ExternalLinkageWebSocketUrl')}
          </div>
          <div className="my-2 whitespace-pre-line text-sm">
            {t('ExternalLinkageWebSocketUrlInfo')}
          </div>
          <div className="mt-2">
            <input
              className="text-ellipsis px-4 py-2 w-full bg-white hover:bg-white-hover rounded-lg"
              type="text"
              placeholder="ws://localhost:8000/ws"
              value={externalLinkageWebSocketUrl}
              onChange={(e) =>
                settingsStore.setState({
                  externalLinkageWebSocketUrl: e.target.value,
                })
              }
            />
          </div>
        </>
      )}
    </div>
  )
}
export default ExternalLinkage
